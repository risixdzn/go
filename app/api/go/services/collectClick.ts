import prisma from "@/lib/db";
import { Context } from "hono";
import { getGeo } from "../helpers/getGeo";
import { redis } from "@/lib/redis/connection";
import { linkClickCachekey } from "../helpers/cache";

export async function collectClick({
    data,
    ctx,
    linkId,
}: {
    data: { ip?: string; userAgent: string | null; utm_source?: string; utm_campaign?: string };
    ctx: Context;
    linkId: string;
}) {
    if (!data.ip) return;

    const geo = getGeo(ctx);
    const cacheKey = linkClickCachekey(data.ip, linkId);

    if (await redis.exists(cacheKey)) return;

    await redis.set(cacheKey, 1, "EX", 60);

    return await prisma.click.create({
        data: {
            linkId,
            timestamp: new Date(),
            ip: data.ip,
            country: geo.country,
            region: geo.region,
            city: geo.city,
            userAgent: data.userAgent,
            utm_source: data.utm_source,
            utm_campaign: data.utm_campaign,
        },
    });
}
