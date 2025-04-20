"use client";

import { Button } from "@/components/ui/button";
import { linkSchema } from "@/lib/schemas/linkSchemas";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { z } from "zod";

export function LinkCard({ link }: { link: z.infer<typeof linkSchema> }) {
    const [copied, setCopied] = useState(false);

    function copyToClipboard() {
        setCopied(true);
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/${link.slug}`);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div className='border-border border w-full rounded-xl md:rounded-3xl shadow-md py-4 px-6 flex justify-between items-center'>
            <div className='flex flex-col gap-1'>
                <h4 className='text-2xl md:text-3xl font-semibold tracking-tight'>
                    <span className='font-light mr-2 text-2xl'>go /</span>
                    {link.slug}
                </h4>
                <p className='inline-flex items-center gap-1 text-sm text-muted-foreground'>
                    {link.url}
                </p>
            </div>
            <div>
                <Button
                    size={"icon"}
                    variant={"secondary"}
                    className='size-10 md:size-14 rounded-full cursor-pointer border border-border'
                    onClick={() => copyToClipboard()}
                >
                    {!copied ? (
                        <Copy className='!size-5 md:!size-6' />
                    ) : (
                        <Check className='!size-5 md:!size-6' />
                    )}
                </Button>
            </div>
        </div>
    );
}
