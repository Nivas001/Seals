import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  category: z.string().optional(),
  subject: z.string().min(1).max(140),
  message: z.string().min(1).max(3000),
  attachment: z
    .object({
      filename: z.string(),
      content: z.string(), // base64 encoded string
    })
    .optional(),
});

export const sendContactEmail = createServerFn({ method: "POST" })
  .validator(contactSchema.parse)
  .handler(async ({ data }) => {
    const { name, email, category, subject, message, attachment } = data;

    const apiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.RESEND_TO_EMAIL || "sales@aarrkkaa.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // Build the responsive, premium HTML email layout
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03); background-color: #ffffff;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #111111 0%, #222222 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #c5a880;">
          <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase;">AARRKKAA INTERNATIONAL</h2>
          <p style="color: #c5a880; margin: 8px 0 0 0; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em;">New Inquiry Form Submission</p>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px 24px; color: #333333; line-height: 1.6;">
          <h3 style="color: #111111; margin-top: 0; font-size: 16px; font-weight: 700; border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; text-transform: uppercase; letter-spacing: 0.05em;">Contact Information</h3>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; width: 110px; color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Name</td>
              <td style="padding: 8px 0; color: #111111; font-weight: 500; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${email}" style="color: #c5a880; text-decoration: none; font-weight: 600;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #888888; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Category</td>
              <td style="padding: 8px 0; color: #111111; font-size: 14px;">
                <span style="background-color: #f7f5f0; color: #c5a880; padding: 4px 10px; border-radius: 20px; font-weight: 600; font-size: 12px; border: 1px solid rgba(197, 168, 128, 0.2);">${category || "General Inquiry"}</span>
              </td>
            </tr>
          </table>

          <h3 style="color: #111111; font-size: 16px; font-weight: 700; border-bottom: 1px solid #f0f0f0; padding-bottom: 10px; margin-top: 28px; text-transform: uppercase; letter-spacing: 0.05em;">Inquiry Details</h3>
          
          <p style="margin: 12px 0 6px 0; font-weight: 600; color: #111111; font-size: 14px;">Subject: <span style="font-weight: 400; color: #444444;">${subject}</span></p>
          
          <div style="background-color: #fafafa; border-left: 3px solid #c5a880; padding: 20px; border-radius: 8px; margin-top: 12px; white-space: pre-wrap; font-size: 14px; color: #444444; border: 1px solid #f0f0f0; border-left-width: 4px;">${message}</div>

          ${
            attachment
              ? `
            <div style="margin-top: 28px; padding: 14px 18px; background-color: #f7f9fa; border: 1px dashed #cfd8dc; border-radius: 8px; font-size: 13px; color: #455a64; display: flex; align-items: center; gap: 8px;">
              <strong>📎 Attachment Included:</strong> <span style="font-family: monospace; font-size: 12px; background: #eceff1; padding: 2px 6px; border-radius: 4px;">${attachment.filename}</span>
            </div>
          `
              : ""
          }
        </div>
        
        <!-- Footer -->
        <div style="background-color: #fafafa; padding: 20px; text-align: center; font-size: 11px; color: #999999; border-top: 1px solid #eaeaea;">
          This message was securely transmitted via the AARRKKAA International web portal contact form.
        </div>
      </div>
    `;

    if (!apiKey) {
      console.warn("==========================================================================");
      console.warn("WARNING: RESEND_API_KEY environment variable is not defined!");
      console.warn(`Email Details (Logged to Console):`);
      console.warn(`From: ${fromEmail}`);
      console.warn(`To: ${toEmail}`);
      console.warn(`Subject: AARRKKAA Inquiry: ${subject}`);
      console.warn(`Category: ${category}`);
      console.warn(`Sender: ${name} <${email}>`);
      console.warn(`Message:\n${message}`);
      if (attachment) {
        console.warn(`Attachment: ${attachment.filename} (${attachment.content.length} bytes base64)`);
      }
      console.warn("==========================================================================");

      return {
        success: true,
        mock: true,
        message: "Email logged in server console (RESEND_API_KEY not configured).",
      };
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: toEmail,
          subject: `AARRKKAA Inquiry: ${subject}`,
          html: htmlContent,
          attachments: attachment
            ? [
                {
                  filename: attachment.filename,
                  content: attachment.content,
                },
              ]
            : undefined,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown API error" }));
        console.error("Resend API Failure Response:", errorData);
        throw new Error(errorData.message || "Failed to send email via Resend API");
      }

      const responseData = await response.json();

      // Save to database
      try {
        await db.inquiry.create({
          data: {
            name,
            email,
            category: category || null,
            subject,
            message,
          }
        });
      } catch (dbError) {
        console.error("Failed to save inquiry to database:", dbError);
      }

      return {
        success: true,
        mock: false,
        id: responseData.id,
      };
    } catch (error: any) {
      console.error("Error sending email via Resend API:", error);
      return {
        success: false,
        error: error.message || "An unexpected error occurred while sending the email",
      };
    }
  });
