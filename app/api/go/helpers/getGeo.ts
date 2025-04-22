import { Context } from "hono";

export function getGeo(c: Context) {
    const country = c.req.header("X-Vercel-IP-Country");
    const region = c.req.header("X-Vercel-IP-Region");
    const city = c.req.header("X-Vercel-IP-City");

    return { country, region, city };
}
