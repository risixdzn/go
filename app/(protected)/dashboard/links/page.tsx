import { LinkCard } from "@/components/dashboard/links/link-card";
import { env } from "@/lib/env";
import { linkSchema } from "@/lib/schemas/linkSchemas";
import { tryCatch } from "@/lib/utils";
import axios from "axios";
import { cookies } from "next/headers";
import Link from "next/link";
import { z } from "zod";

export default async function LinksPage() {
    const cookieString = (await cookies()).toString();

    const { data } = await tryCatch(
        axios.get<z.infer<typeof linkSchema>[]>(`/api/go/links`, {
            withCredentials: true,
            baseURL: env.NEXT_PUBLIC_APP_URL,
            headers: {
                Cookie: cookieString,
            },
        })
    );

    return (
        <div className='mt-20 md:mt-24 md:py-10 space-y-6 pb-22'>
            <div>
                <h2 className='text-2xl md:text-3xl font-title font-semibold'>My links</h2>
                <p className='text-muted-foreground'>See all your shortened links.</p>
            </div>

            <div className='flex flex-col gap-2'>
                {data &&
                    data.data.map((linkData) => (
                        <Link
                            prefetch
                            key={linkData.slug}
                            href={`/dashboard/links/${linkData.slug}`}
                        >
                            <LinkCard link={linkData} hoverAnim />
                        </Link>
                    ))}
            </div>
        </div>
    );
}
