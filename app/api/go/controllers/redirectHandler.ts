import { Context } from "hono";
import { z } from "zod";
import { getLinkBySlug } from "../services/links";
import { redirectQuery, redirectSchema } from "@/lib/schemas/redirectSchema";
import { collectClick } from "../services/collectClick";

export async function redirectHandler({
    data,
    metadata,
    ctx,
}: {
    data: z.infer<typeof redirectSchema>;
    metadata: z.infer<typeof redirectQuery>;
    ctx: Context;
}) {
    const link = await getLinkBySlug({ slug: data.slug });

    if (!link) {
        return ctx.redirect("/not-found");
    }

    const clickData = {
        userAgent: ctx.req.header("user-agent") ?? null,
        utm_source: metadata.utm_source,
        utm_campaign: metadata.utm_campaign,
    };

    await collectClick({ data: clickData, linkId: link.id, ctx });

    return ctx.redirect(link.url);
}
