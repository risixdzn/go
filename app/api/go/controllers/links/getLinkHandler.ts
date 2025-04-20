import { getLinkSchema } from "@/lib/schemas/linkSchemas";
import { Context } from "hono";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getLinkBySlug } from "../../services/links";

export async function getLinkHandler({
    data,
    ctx,
}: {
    data: z.infer<typeof getLinkSchema>;
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

    return ctx.json(link);
}
