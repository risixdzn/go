import prisma from "@/lib/db";
import { Context } from "hono";
import { redis } from "@/lib/redis/connection";
import { linkClickCachekey } from "../helpers/cache";
import { getMetadata } from "../helpers/getMetadata";

export async function collectClick({
    data,
    ctx,
    linkId,
}: {
    data: { userAgent: string | null; utm_source?: string; utm_campaign?: string };
    ctx: Context;
    linkId: string;
}) {
    const metadata = getMetadata(ctx);

    if (metadata.ip) {
        const cacheKey = linkClickCachekey("177.189.14.154", linkId);

        if (await redis.exists(cacheKey)) return;

        await redis.set(cacheKey, 1, "EX", 60);
    }

    await prisma.click.create({
        data: {
            linkId,
            timestamp: new Date(),
            userAgent: data.userAgent,
            utm_source: data.utm_source,
            utm_campaign: data.utm_campaign,
            ...metadata,
        },
    });
}
