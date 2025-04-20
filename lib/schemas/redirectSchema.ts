import { z } from "zod";

export const redirectSchema = z.object({ slug: z.string() });
