import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { createAuthClient } from "better-auth/react";
import prisma from "./db";
import { createAuthMiddleware } from "better-auth/api";
import { APIError } from "better-call";

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
    },
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path.startsWith("/sign-up")) {
                const allowedEmails = process.env.WHITELIST_EMAILS?.replace(/\s+/g, "").split(",");

                if (!allowedEmails?.includes(ctx.body.email)) {
                    throw new APIError("BAD_REQUEST", {
                        message: "You are not whitelisted.",
                    });
                }
            }
        }),
    },
});

export const authClient = createAuthClient();
