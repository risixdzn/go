import { Context } from "hono";

export function getMetadata(c: Context) {
    const ip = c.req.header("x-forwarded-for") ?? null;
    const country = c.req.header("x-vercel-ip-country") ?? null;
    const region = c.req.header("x-vercel-ip-country-region") ?? null;
    const city = c.req.header("x-vercel-ip-city");

    return { ip, country, region, city: city ? decodeURIComponent(city) : null };
}
