import { shortenLinkSchema } from "@/lib/schemas/shortenLinkSchema";
import { Context } from "hono";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createLink, generateSlug, getUserLinkByUrl } from "../services/links";

export async function shortenHandler({
    data,
    ctx,
}: {
    data: z.infer<typeof shortenLinkSchema>;
    ctx: Context;
}) {
    const session = await auth.api.getSession({
        headers: await headers(), // you need to pass the headers object.
    });

    if (!session) {
        return ctx.json({ error: "Unauthorized" }, 401);
    }

    const existingQuery = getUserLinkByUrl({ url: data.url, userId: session.user.id });
    const generateSlugAsync = generateSlug(5);

    const [existing, slug] = await Promise.all([existingQuery, generateSlugAsync]);

    if (existing) {
        return ctx.json(existing);
    }

    const created = await createLink({
        url: data.url,
        slug,
        userId: session.user.id,
    });

    return ctx.json(created);
}
