import { editLinkPatchSchema, getLinkSchema, shortenLinkSchema } from "@/lib/schemas/linkSchemas";
import { Hono } from "hono";
import { shortenHandler } from "../controllers/links/shortenHandler";
import { getLinkHandler } from "../controllers/links/getLinkHandler";
import { getAllLinks } from "../controllers/links/getAllLinks";
import { editLinkHandler } from "../controllers/links/editLinkHandler";

export const linkRoutes = new Hono();

linkRoutes.get("/", async (c) => {
    return getAllLinks({ ctx: c });
});

linkRoutes.get("/:slug", async (c) => {
    const params = getLinkSchema.parse(c.req.param());
    return getLinkHandler({ data: params, ctx: c });
});

linkRoutes.post("/", async (c) => {
    const body = shortenLinkSchema.parse(await c.req.json());
    return await shortenHandler({ data: body, ctx: c });
});

linkRoutes.patch("/:slug", async (c) => {
    const { slug } = getLinkSchema.parse(c.req.param());
    const body = editLinkPatchSchema.parse(await c.req.json());
    return await editLinkHandler({ data: body, slug, ctx: c });
});
