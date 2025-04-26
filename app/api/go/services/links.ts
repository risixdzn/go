import prisma from "@/lib/db";
import { editLinkPatchSchema, linkSchema, userLinksSchema } from "@/lib/schemas/linkSchemas";
import { z } from "zod";
import { CACHE_TTL, linkSlugCachekey, userLinksCachekey } from "../helpers/cache";
import { redis } from "@/lib/redis/connection";

export async function getLinkBySlug({ slug }: { slug: string }) {
    const key = linkSlugCachekey(slug);
    const cached = await redis.get(key);

    if (cached) return linkSchema.parse(JSON.parse(cached));

    console.log(slug);

    const raw = await prisma.link.findUnique({
        where: {
            slug,
        },
    });

    if (!raw) return null;

    const link = linkSchema.parse(raw);

    await redis.set(key, JSON.stringify(link), "EX", CACHE_TTL);

    return link;
}

export async function getUserLinkByUrl({ url, userId }: { url: string; userId: string }) {
    return await prisma.link.findFirst({
        where: {
            url,
            userId,
        },
    });
}

export async function getUserLinks({ userId }: { userId: string }) {
    const key = userLinksCachekey(userId);
    const cached = await redis.get(key);

    if (cached) return userLinksSchema.parse(JSON.parse(cached));

    const links = userLinksSchema.parse(
        await prisma.link.findMany({
            where: {
                userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        })
    );

    await redis.set(key, JSON.stringify(links), "EX", CACHE_TTL);

    return links;
}

export async function createLink({
    url,
    slug,
    userId,
}: {
    url: string;
    slug: string;
    userId: string;
}) {
    await redis.del(userLinksCachekey(userId));

    return await prisma.link.create({
        data: {
            url,
            slug,
            userId,
        },
    });
}

export async function updateLinkBySlug({
    data,
    userId,
    slug,
}: {
    data: z.infer<typeof editLinkPatchSchema>;
    userId: string;
    slug: string;
}) {
    await redis.del(linkSlugCachekey(slug));
    await redis.del(userLinksCachekey(userId));

    return await prisma.link.update({
        where: {
            slug,
        },
        data,
    });
}

export async function deleteLinkBySlug({ slug, userId }: { slug: string; userId: string }) {
    await redis.del(linkSlugCachekey(slug));
    await redis.del(userLinksCachekey(userId));

    return await prisma.link.delete({
        where: {
            slug,
        },
    });
}

export async function generateSlug(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    const existing = await prisma.link.findUnique({
        where: {
            slug: result,
        },
    });

    if (existing) {
        return generateSlug(length + 1);
    }

    return result;
}
