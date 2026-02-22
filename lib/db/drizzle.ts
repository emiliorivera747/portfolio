import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

// Singleton pattern similar to Prisma client
const drizzleClientSingleton = () => {
  const queryClient = postgres(connectionString, {
    max: process.env.NODE_ENV === "production" ? 10 : 1,
  });

  return drizzle(queryClient, {
    schema,
    logger: process.env.NODE_ENV === "development",
  });
};

declare const globalThis: {
  drizzleGlobal: ReturnType<typeof drizzleClientSingleton>;
} & typeof global;

export const db = globalThis.drizzleGlobal ?? drizzleClientSingleton();

if (process.env.NODE_ENV !== "production") globalThis.drizzleGlobal = db;
