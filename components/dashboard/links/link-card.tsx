"use client";

import { Button } from "@/components/ui/button";
import { linkSchema } from "@/lib/schemas/linkSchemas";
import { Check, Copy, PencilLine } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { EditLinkForm } from "./edit-link-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export function LinkCard({
    link,
    allowEditing,
    hoverAnim,
}: {
    link: z.infer<typeof linkSchema>;
    allowEditing?: boolean;
    hoverAnim?: boolean;
}) {
    const [copied, setCopied] = useState(false);
    const [editing, setEditing] = useState(false);

    function copyToClipboard() {
        setCopied(true);
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/${link.slug}`);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div
            className={cn(
                "border-border border w-full rounded-xl md:rounded-3xl shadow-md py-4 px-6 flex justify-between items-center transition-all ease-in-out",
                hoverAnim && "hover:shadow-lg hover:scale-[1.015]"
            )}
        >
            {!editing ? (
                <>
                    <div className='flex flex-col gap-1 w-[calc(100%-5.5rem)] md:w-[calc(100%-7rem)]'>
                        <h4 className='text-2xl md:text-3xl font-semibold tracking-tight w-full truncate'>
                            <span className='font-light mr-2 text-2xl'>go /</span>
                            {link.slug}
                        </h4>
                        <p className='inline-flex items-center gap-1 text-sm text-muted-foreground w-full truncate'>
                            {link.url}
                        </p>
                    </div>
                    <div className='flex gap-1'>
                        {allowEditing && (
                            <Button
                                size={"icon"}
                                variant={"ghost"}
                                className='size-10 md:size-14 rounded-full cursor-pointer'
                                onClick={() => setEditing(true)}
                            >
                                <PencilLine className='!size-5 md:!size-6' />
                            </Button>
                        )}
                        <Button
                            size={"icon"}
                            variant={"secondary"}
                            className='size-10 md:size-14 rounded-full cursor-pointer border border-border'
                            onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                copyToClipboard();
                            }}
                        >
                            {!copied ? (
                                <Copy className='!size-5 md:!size-6' />
                            ) : (
                                <Check className='!size-5 md:!size-6' />
                            )}
                        </Button>
                    </div>
                </>
            ) : (
                <EditLinkForm link={link} onExit={() => setEditing(false)} />
            )}
        </div>
    );
}
