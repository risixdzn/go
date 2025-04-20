import prisma from "@/lib/db";

export async function getUserLinkBySlug({ slug, userId }: { slug: string; userId: string }) {
    return await prisma.link.findUnique({
        where: {
            slug,
            userId,
        },
    });
}

export async function getUserLinkByUrl({ url, userId }: { url: string; userId: string }) {
    return await prisma.link.findFirst({
        where: {
            url,
            userId,
        },
    });
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
    return await prisma.link.create({
        data: {
            url,
            slug,
            userId,
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
        return generateSlug(length);
    }

    return result;
}
