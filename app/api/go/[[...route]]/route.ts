import { linkRoutes } from "@/app/api/go/routes/links.routes";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { redirectRoutes } from "../routes/redirect.routes";

export const runtime = "nodejs";

const app = new Hono().basePath("/api/go");

app.route("/links", linkRoutes);
app.route("/redirect", redirectRoutes);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
