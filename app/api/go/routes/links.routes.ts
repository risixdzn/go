import { getLinkSchema, shortenLinkSchema } from "@/lib/schemas/linkSchemas";
import { Hono } from "hono";
import { shortenHandler } from "../controllers/links/shortenHandler";
import { getLinkHandler } from "../controllers/links/getLinkHandler";
import { getAllLinks } from "../controllers/links/getAllLinks";

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
