import { Context } from "hono";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserLinks } from "../../services/links";

export async function getAllLinks({ ctx }: { ctx: Context }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return ctx.json({ error: "Unauthorized" }, 401);
    }

    const links = await getUserLinks({ userId: session.user.id });

    return ctx.json(links);
}
