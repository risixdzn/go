import Redis from "ioredis";
import { env } from "../env";

const isProduction = process.env.NODE_ENV === "production";
const shouldUseTls = env.REDIS_TLS === "true" || isProduction;

export const redis = new Redis(env.REDIS_URL, {
    ...(shouldUseTls ? { tls: {} } : {}),
});
