import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db } from "@/lib/db";

export const APIRoute = createAPIFileRoute("/api/log-drain")({
  POST: async ({ request }) => {
    try {
      const data = await request.json();
      
      // Vercel Log Drains can send arrays of log objects
      const logs = Array.isArray(data) ? data : [data];
      
      const trafficLogs = logs
        .filter((log: any) => log.source === "edge" || log.type === "request" || log.source === "custom-tracker")
        .map((log: any) => {
          if (log.source === "custom-tracker") {
             // Custom tracker sends these directly, but we get IP/Country from the incoming request headers
             return {
                path: log.path || "/",
                userAgent: log.userAgent || "Unknown",
                referrer: log.referrer || "Direct",
                country: request.headers.get("x-vercel-ip-country") || "Unknown",
                ip: request.headers.get("x-forwarded-for") || "0.0.0.0",
                timestamp: new Date()
             };
          }

          // Legacy Vercel payload handling
          const proxy = log.proxy || {};
          const headers = log.headers || {};
          
          return {
            path: log.path || "/",
            userAgent: proxy.userAgent || headers["user-agent"] || "Unknown",
            referrer: proxy.referer || headers["referer"] || "Direct",
            country: proxy.clientIpCountry || headers["x-vercel-ip-country"] || "Unknown",
            ip: proxy.clientIp || headers["x-forwarded-for"] || "0.0.0.0",
            timestamp: new Date(log.timestamp || Date.now())
          };
        });

      if (trafficLogs.length > 0) {
        await db.vercelTrafficLog.createMany({
          data: trafficLogs
        });
      }

      return new Response(JSON.stringify({ success: true, count: trafficLogs.length }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } catch (error) {
      console.error("Failed to parse log drain:", error);
      return new Response(JSON.stringify({ success: false, error: "Invalid payload" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
  }
});
