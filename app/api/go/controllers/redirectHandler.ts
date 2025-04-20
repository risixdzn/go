import { Context } from "hono";
import { z } from "zod";
import { getLinkBySlug } from "../services/links";
import { redirectSchema } from "@/lib/schemas/redirectSchema";

export async function redirectHandler({
    data,
    ctx,
}: {
    data: z.infer<typeof redirectSchema>;
    ctx: Context;
}) {
    const link = await getLinkBySlug({ slug: data.slug });

    if (!link) {
        return ctx.json({ error: "Link not found" }, 404);
    }

    return ctx.redirect(link.url);
}
