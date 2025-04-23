import prisma from "@/lib/db";
import { Context } from "hono";
import { redis } from "@/lib/redis/connection";
import { linkClickCachekey } from "../helpers/cache";
import { getGeo } from "hono-geo-middleware";

export async function collectClick({
    data,
    ctx,
    linkId,
}: {
    data: { userAgent: string | null; utm_source?: string; utm_campaign?: string };
    ctx: Context;
    linkId: string;
}) {
    const geo = getGeo(ctx);

    if (geo && geo.ip) {
        const cacheKey = linkClickCachekey(geo.ip, linkId);

        if (await redis.exists(cacheKey)) return;

        await redis.set(cacheKey, 1, "EX", 60);

        await prisma.click.create({
            data: {
                linkId,
                timestamp: new Date(),
                ip: geo.ip,
                country: geo.country,
                region: geo.region,
                city: geo.city,
                userAgent: data.userAgent,
                utm_source: data.utm_source,
                utm_campaign: data.utm_campaign,
            },
        });
    }
}
