import { Hono } from "hono";
import { redirectQuery, redirectSchema } from "@/lib/schemas/redirectSchema";
import { redirectHandler } from "../controllers/redirectHandler";

export const redirectRoutes = new Hono();

redirectRoutes.get("/:slug", async (c) => {
    const params = redirectSchema.parse(c.req.param());
    const query = redirectQuery.parse(c.req.query());
    return redirectHandler({ data: params, metadata: query, ctx: c });
});
