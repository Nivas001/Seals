import { AsyncLocalStorage } from "node:async_hooks";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

const requestDb = new AsyncLocalStorage<PrismaClient>();

export async function runWithDb<T>(databaseUrl: string, callback: () => Promise<T>): Promise<T> {
  const client = new PrismaClient({
    adapter: new PrismaPg({ connectionString: databaseUrl }),
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

  try {
    return await requestDb.run(client, callback);
  } finally {
    await client.$disconnect();
  }
}

export const db = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = requestDb.getStore();
    if (!client) {
      throw new Error("Database access must run inside a Cloudflare request.");
    }
    return Reflect.get(client, property, client);
  },
});

