import { linkRoutes } from "@/app/api/go/routes/links.routes";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { redirectRoutes } from "../routes/redirect.routes";
import { GeoMiddleware } from "hono-geo-middleware";
import { getGeo } from "../helpers/getGeo";

export const runtime = "nodejs";

const app = new Hono().basePath("/api/go");

app.route("/links", linkRoutes);
app.route("/redirect", redirectRoutes);
app.use("/*", GeoMiddleware());
app.get("/geo", (c) => {
    const country = c.req.header("x-vercel-ip-country");
    const region = c.req.header("x-vercel-ip-country-region");
    const city = c.req.header("x-vercel-ip-city");

    const geo = getGeo(c);

    return c.json({ country, region, city, geo });
});

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
