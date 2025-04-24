"use client";

import { Button } from "@/components/ui/button";
import { linkSchema } from "@/lib/schemas/linkSchemas";
import { Check, Copy, ExternalLink, PencilLine } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";
import { EditLinkForm } from "./edit-link-form";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function LinkCard({
    link,
    allowEditing,
    allowOpenNewTab,
    hoverAnim,
    ...props
}: {
    link: z.infer<typeof linkSchema>;
    allowEditing?: boolean;
    allowOpenNewTab?: boolean;
    hoverAnim?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
    const [copied, setCopied] = useState(false);
    const [editing, setEditing] = useState(false);

    function copyToClipboard() {
        setCopied(true);
        navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/${link.slug}`);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
    }

    function supressAndRun(fn: () => void, e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        fn();
    }

    return (
        <div
            className={cn(
                "border-border border w-full rounded-xl md:rounded-3xl shadow-md py-4 px-6 flex justify-between items-center transition-all ease-in-out",
                hoverAnim && "hover:shadow-lg hover:scale-[1.015]",
                props.className
            )}
            {...props}
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
                        {allowOpenNewTab && (
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        size={"icon"}
                                        variant={"ghost"}
                                        className='size-10 md:size-14 rounded-full cursor-pointer'
                                        onClick={(e) =>
                                            supressAndRun(() => window.open(link.url, "_blank"), e)
                                        }
                                    >
                                        <ExternalLink className='!size-5 md:!size-6' />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent side='bottom'>Open link</TooltipContent>
                            </Tooltip>
                        )}
                        {allowEditing && (
                            <Button
                                size={"icon"}
                                variant={"ghost"}
                                className='size-10 md:size-14 rounded-full cursor-pointer'
                                onClick={(e) => supressAndRun(() => setEditing(true), e)}
                            >
                                <PencilLine className='!size-5 md:!size-6' />
                            </Button>
                        )}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    size={"icon"}
                                    variant={"secondary"}
                                    className='size-10 md:size-14 rounded-full cursor-pointer border border-border'
                                    onClick={(e) => supressAndRun(copyToClipboard, e)}
                                >
                                    {!copied ? (
                                        <Copy className='!size-5 md:!size-6' />
                                    ) : (
                                        <Check className='!size-5 md:!size-6' />
                                    )}
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy to clipboard</TooltipContent>
                        </Tooltip>
                    </div>
                </>
            ) : (
                <EditLinkForm link={link} onExit={() => setEditing(false)} />
            )}
        </div>
    );
}
