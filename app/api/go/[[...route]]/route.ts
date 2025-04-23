import { linkRoutes } from "@/app/api/go/routes/links.routes";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { redirectRoutes } from "../routes/redirect.routes";
import { GeoMiddleware } from "hono-geo-middleware";

export const runtime = "nodejs";

const app = new Hono().basePath("/api/go");

app.route("/links", linkRoutes);
app.route("/redirect", redirectRoutes);
app.use("/*", GeoMiddleware());

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
