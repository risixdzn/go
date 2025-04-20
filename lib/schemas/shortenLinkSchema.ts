import { z } from "zod";

export const shortenLinkSchema = z.object({
    url: z.string().url(),
});
