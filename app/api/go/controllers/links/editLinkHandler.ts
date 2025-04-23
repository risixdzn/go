import { editLinkPatchSchema } from "@/lib/schemas/linkSchemas";
import { Context } from "hono";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getLinkBySlug, updateLinkBySlug } from "../../services/links";

export async function editLinkHandler({
    slug,
    data,
    ctx,
}: {
    slug: string;
    data: z.infer<typeof editLinkPatchSchema>;
    ctx: Context;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return ctx.json({ error: "Unauthorized" }, 401);
    }

    const link = await getLinkBySlug({ slug });

    if (!link) {
        return ctx.json({ error: "Link not found" }, 404);
    }

    if (link.userId !== session.user.id) {
        return ctx.json({ error: "Unauthorized" }, 401);
    }

    if (data.slug) {
        const existing = await getLinkBySlug({ slug: data.slug });

        if (existing) {
            return ctx.json({ error: "Slug already in use" }, 400);
        }
    }

    const updated = await updateLinkBySlug({ data, slug, userId: session.user.id });

    return ctx.json(updated);
}
