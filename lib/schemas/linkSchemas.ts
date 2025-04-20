import { z } from "zod";

export const linkSchema = z.object({
    id: z.string().cuid2(),
    url: z.string().url(),
    slug: z.string(),
    userId: z.string().cuid2(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const shortenLinkSchema = z.object({
    url: z.string().url(),
});
