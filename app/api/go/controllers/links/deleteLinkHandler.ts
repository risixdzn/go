import { deleteLinkSchema } from "@/lib/schemas/linkSchemas";
import { Context } from "hono";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { deleteLinkBySlug, getLinkBySlug } from "../../services/links";

export async function deleteLinkHandler({
    data,
    ctx,
}: {
    data: z.infer<typeof deleteLinkSchema>;
    ctx: Context;
}) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return ctx.json({ error: "Unauthorized" }, 401);
    }

    const link = await getLinkBySlug({ slug: data.slug });

    if (!link) {
        return ctx.json({ error: "Link not found" }, 404);
    }

    if (link.userId !== session.user.id) {
        return ctx.json({ error: "Unauthorized" }, 401);
    }

    await deleteLinkBySlug({ slug: data.slug });

    return ctx.json({}, 201);
}
