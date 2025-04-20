import { shortenLinkSchema } from "@/lib/schemas/linkSchemas";
import { Context } from "hono";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createLink, generateSlug } from "../services/links";

export async function shortenHandler({
    data,
    ctx,
}: {
    data: z.infer<typeof shortenLinkSchema>;
    ctx: Context;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return ctx.json({ error: "Unauthorized" }, 401);
    }

    const slug = await generateSlug(5);

    const created = await createLink({
        url: data.url,
        slug,
        userId: session.user.id,
    });

    return ctx.json(created);
}
