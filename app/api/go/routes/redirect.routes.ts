import { Hono } from "hono";
import { redirectSchema } from "@/lib/schemas/redirectSchema";
import { redirectHandler } from "../controllers/redirectHandler";

export const redirectRoutes = new Hono();

redirectRoutes.get("/:slug", async (c) => {
    const params = redirectSchema.parse(c.req.param());
    return redirectHandler({ data: params, ctx: c });
});
