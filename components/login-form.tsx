"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth";
import { loginSchema } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "./ui/form";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "all",
    });

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof loginSchema>) {
        setIsLoading(true);
        try {
            await authClient.signIn.email(
                {
                    email: values.email,
                    password: values.password,
                    callbackURL: "/dashboard",
                },
                {
                    onRequest: () => {
                        setIsLoading(true);
                    },
                    onSuccess: () => {
                        setIsLoading(false);
                        toast.success("Welcome!");
                        router.push("/dashboard");
                    },
                    onError: (ctx) => {
                        toast.error(ctx.error.message);
                        setIsLoading(false);
                    },
                }
            );
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
        console.log(values);
    }

    const { formState } = form;

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className={className} {...props}>
                    <div className='flex flex-col gap-6'>
                        <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Mail className='size-3' />
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input placeholder='m@example.com' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Lock className='size-3' />
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='••••••••' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            disabled={!formState.isValid || isLoading}
                            type='submit'
                            className='w-full'
                            size={"lg"}
                        >
                            Login {isLoading && <Loader2 className='animate-spin size-4' />}
                        </Button>
                    </div>
                </form>
            </Form>

            <div className='text-center text-sm'>
                Don&apos;t have an account?{" "}
                <Link href='/auth/signup' prefetch className='underline underline-offset-4'>
                    Sign up
                </Link>
            </div>
        </>
    );
}
