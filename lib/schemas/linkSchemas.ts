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

export const getLinkSchema = z.object({
    slug: z.string(),
});

export const deleteLinkSchema = z.object({
    slug: z.string(),
});

export const editLinkSchema = z.object({
    url: z.string().url(),
    slug: z
        .string()
        .min(2, { message: "Must be at least 2 characters long." })
        .max(64, { message: "Must be at most 64 characters long." })
        .regex(/^[a-zA-Z0-9-]+$/, { message: "Invalid slug." }),
});

export const editLinkPatchSchema = z
    .object({
        url: z.string().url().optional(),
        slug: z
            .string()
            .min(2, { message: "Must be at least 2 characters long." })
            .max(64, { message: "Must be at most 64 characters long." })
            .regex(/^[a-zA-Z0-9-]+$/, { message: "Invalid slug." })
            .optional(),
    })
    .refine(
        (data: { [key: string]: string }) =>
            Object.keys(data).some((key) => data[key] !== undefined),
        {
            message: "At least one field must be provided",
        }
    );
