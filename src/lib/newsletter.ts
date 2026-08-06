import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "./db";

const subscribeSchema = z.object({
  email: z.string().email(),
});

export const subscribeToNewsletter = createServerFn({ method: "POST" })
  .validator(subscribeSchema.parse)
  .handler(async ({ data }) => {
    const { email } = data;

    try {
      // Upsert to handle existing subscribers gracefully
      await db.subscriber.upsert({
        where: { email },
        update: {}, // if it exists, do nothing
        create: { email }, // if it doesn't exist, create it
      });

      return {
        success: true,
      };
    } catch (error: any) {
      console.error("Failed to subscribe email:", error);
      return {
        success: false,
        error: "Failed to process subscription. Please try again later.",
      };
    }
  });
