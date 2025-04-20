"use client";

import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form";
import { linkSchema, editLinkSchema } from "@/lib/schemas/linkSchemas";
import { cn, getChangedProps } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { X, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function EditLinkForm({
    link,
    onExit,
}: {
    link: z.infer<typeof linkSchema>;
    onExit: () => void;
}) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof editLinkSchema>>({
        resolver: zodResolver(editLinkSchema),
        defaultValues: {
            url: link.url,
            slug: link.slug,
        },
        mode: "all",
    });

    async function onSubmit(values: z.infer<typeof editLinkSchema>) {
        setIsLoading(true);
        try {
            const changed = getChangedProps(link, values);
            await axios.patch<z.infer<typeof linkSchema>>(`/api/go/links/${link.slug}`, changed);
            toast.success("Link updated!");
            onExit();
            if (link.slug !== values.slug) {
                return router.push(`/dashboard/links/${values.slug}`);
            }
            router.refresh();
        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 409) {
                    toast.error("Slug already in use.");
                }
            }
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const { formState } = form;

    return (
        <Form {...form}>
            <form
                className='flex justify-between items-center w-full'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className='flex flex-col gap-1'>
                    <h4 className='text-2xl md:text-3xl font-semibold tracking-tight inline-flex items-end '>
                        <span className='font-light mr-2 text-2xl whitespace-nowrap'>go /</span>
                        <FormField
                            control={form.control}
                            name='slug'
                            render={({ field }) => (
                                <input
                                    placeholder='slug'
                                    className={cn(
                                        "border-b-2 focus:outline-none border-foreground w-full grow",
                                        formState.errors.slug &&
                                            "border-destructive text-destructive"
                                    )}
                                    {...field}
                                />
                            )}
                        />
                    </h4>
                    <FormField
                        control={form.control}
                        name='url'
                        render={({ field }) => (
                            <input
                                placeholder='https://example.com'
                                type='url'
                                className={cn(
                                    "border-b-1 focus:outline-none border-muted-foreground/50 w-full grow max-w-64 text-sm text-muted-foreground",
                                    formState.errors.url && "border-destructive text-destructive"
                                )}
                                {...field}
                            />
                        )}
                    />
                </div>
                <div className='flex gap-1'>
                    <Button
                        type='button'
                        size={"icon"}
                        variant={"ghost"}
                        className='size-10 md:size-14 rounded-full cursor-pointer'
                        onClick={() => onExit()}
                    >
                        <X className='!size-5 md:!size-6' />
                    </Button>
                    <Button
                        type='submit'
                        size={"icon"}
                        variant={"default"}
                        className='size-10 md:size-14 rounded-full cursor-pointer border border-border'
                        disabled={!formState.isValid || isLoading}
                    >
                        <Save className='!size-5 md:!size-6' />
                    </Button>
                </div>
            </form>
        </Form>
    );
}
