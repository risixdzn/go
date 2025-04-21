import { BackButton } from "@/components/dashboard/back-button";
import { DeleteLinkDialog } from "@/components/dashboard/links/delete-link-dialog";
import { LinkCard } from "@/components/dashboard/links/link-card";
import { env } from "@/lib/env";
import { linkSchema } from "@/lib/schemas/linkSchemas";
import { tryCatch } from "@/lib/utils";
import axios from "axios";
import { ArrowLeft } from "lucide-react";
import { cookies } from "next/headers";
import { z } from "zod";

export default async function LinkPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const cookieString = (await cookies()).toString();

    const { data, error } = await tryCatch(
        axios.get<z.infer<typeof linkSchema>>(`/api/go/links/${slug}`, {
            withCredentials: true,
            baseURL: env.NEXT_PUBLIC_APP_URL,
            headers: {
                Cookie: cookieString,
            },
        })
    );

    return (
        <div className='mt-20 md:mt-24 md:py-10 space-y-6'>
            <BackButton variant={"link"} className='!p-0 h-auto'>
                <ArrowLeft /> Back
            </BackButton>
            <div className='flex w-full justify-between items-center'>
                <div>
                    <h2 className='text-2xl md:text-3xl font-title font-semibold'>
                        {!error ? "Your link" : "Oops..."}
                    </h2>
                    <p className='text-muted-foreground'>
                        {!error
                            ? "See the details of the shortened link"
                            : "We couldn't find the link you were looking for."}
                    </p>
                </div>
                {data && <DeleteLinkDialog slug={data.data.slug} />}
            </div>
            {data && <LinkCard link={data.data} allowEditing />}
        </div>
    );
}
