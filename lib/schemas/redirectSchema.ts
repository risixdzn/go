import { z } from "zod";

export const redirectSchema = z.object({ slug: z.string() });

export const redirectQuery = z.object({
    utm_source: z.string().optional(),
    utm_campaign: z.string().optional(),
});
