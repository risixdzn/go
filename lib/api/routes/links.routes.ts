import { shortenLinkSchema } from "@/lib/schemas/shortenLinkSchema";
import { Hono } from "hono";
import { shortenHandler } from "../controllers/shortenHandler";

export const linkRoutes = new Hono();

linkRoutes.get("/", async (c) => {
    return c.json({ foo: "bar" });
});

linkRoutes.post("/", async (c) => {
    const body = shortenLinkSchema.parse(await c.req.json());
    return await shortenHandler({ data: body, ctx: c });
});
