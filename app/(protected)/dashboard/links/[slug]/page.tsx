import { BackButton } from "@/components/dashboard/back-button";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Copy, LinkIcon } from "lucide-react";
import { headers } from "next/headers";

export default async function LinkPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const headersList = await headers();
    const host = headersList.get("host");

    return (
        <div className='mt-20 md:mt-24 md:py-10 space-y-6'>
            <BackButton variant={"link"} className='!p-0 h-auto'>
                <ArrowLeft /> Back
            </BackButton>
            <div>
                <h2 className='text-2xl md:text-3xl font-title font-semibold'>Your link</h2>
                <p className='text-muted-foreground'>See the details of the shortened link</p>
            </div>
            <div className='border-border border w-full rounded-xl md:rounded-3xl shadow-lg py-4 px-6 flex justify-between items-center'>
                <div className='flex flex-col gap-1'>
                    <h4 className='text-2xl md:text-3xl font-semibold tracking-tight'>
                        <span className='font-light mr-2 text-2xl'>go /</span>
                        {slug}
                    </h4>
                    <p className='inline-flex items-center gap-1 text-sm text-muted-foreground'>
                        https://foo.bar
                    </p>
                </div>
                <div>
                    <Button
                        size={"icon"}
                        variant={"secondary"}
                        className='size-10 md:size-14 rounded-full cursor-pointer'
                    >
                        <Copy className='!size-5 md:!size-6' />
                    </Button>
                </div>
            </div>
        </div>
    );
}
