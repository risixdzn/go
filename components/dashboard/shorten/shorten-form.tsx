"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { shortenLinkSchema as defaultFormSchema, linkSchema } from "@/lib/schemas/linkSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CircleAlert, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import axios from "axios";

export function ShortenForm() {
    const [isLoading, setIsLoading] = useState(false);

    const shortenLinkSchema = defaultFormSchema.extend({
        url: z.string().regex(/^(([\w+.-]+):\/\/)?([\w.-]+\.[a-z]{2,})(\/[^\s]*)?$/, {
            message: "Oops! Invalid url...",
        }),
    });

    const form = useForm<z.infer<typeof shortenLinkSchema>>({
        resolver: zodResolver(shortenLinkSchema),
        defaultValues: { url: "" },
        mode: "all",
    });
    const router = useRouter();

    const addHttpsIfMissing = (url: string): string => {
        return /^https?:\/\//i.test(url) ? url : `https://${url}`;
    };

    async function onSubmit(values: z.infer<typeof shortenLinkSchema>) {
        setIsLoading(true);
        try {
            const normalizedUrl = addHttpsIfMissing(values.url);
            const { data } = await axios.post<z.infer<typeof linkSchema>>("/api/go/links", {
                ...values,
                url: normalizedUrl,
            });

            toast.success("Link shortened!");
            router.push(`/dashboard/links/${data.slug}`);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }

    const { formState } = form;

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name='url'
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <div className='relative'>
                                    <Input
                                        placeholder='https://example.com'
                                        className='md:!text-xl tracking-tight h-14 md:h-16 px-6 rounded-full shadow-lg pr-34 md:pr-44'
                                        {...field}
                                    />
                                    <Button
                                        disabled={isLoading || !formState.isValid}
                                        className='h-10 md:h-12 md:text-lg rounded-full absolute right-2 top-2 md:!px-6'
                                        size='lg'
                                    >
                                        Shorten it{" "}
                                        {!isLoading ? (
                                            <ArrowRight className='size-4 md:!size-6' />
                                        ) : (
                                            <Loader2 className='size-4 md:!size-6 animate-spin' />
                                        )}
                                    </Button>
                                </div>
                            </FormControl>

                            {formState.errors.url && (
                                <div className='mt-4 inline-flex items-center gap-2'>
                                    <CircleAlert className='size-5 text-destructive' />
                                    <FormMessage className='text-lg' />
                                </div>
                            )}
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}
