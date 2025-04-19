"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Check, Loader2, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/schemas/authSchema";
import { z } from "zod";
import { useState } from "react";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RegisterForm({
    className,
    signUpMode,
    ...props
}: { signUpMode: "public" | "restricted" } & React.ComponentProps<"form">) {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
        mode: "all",
    });

    const router = useRouter();

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        setIsLoading(true);
        try {
            await authClient.signUp.email(
                {
                    email: values.email, // user email address
                    password: values.password, // user password -> min 8 characters by default
                    name: values.email.split("@")[0], // user display name
                },
                {
                    onRequest: () => {
                        setIsLoading(true);
                    },
                    onSuccess: () => {
                        setIsLoading(false);
                        toast.success("Account created!");
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
                        <FormField
                            control={form.control}
                            name='confirmPassword'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        <Check className='size-3' />
                                        Confirm password
                                    </FormLabel>
                                    <FormControl>
                                        <Input type='password' placeholder='••••••••' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    {signUpMode == "restricted" && (
                                        <p className='text-muted-foreground text-sm'>
                                            Psst! Only users on the whitelist can create accounts.
                                        </p>
                                    )}
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={!formState.isValid || isLoading}
                            type='submit'
                            className='w-full'
                        >
                            Create account{" "}
                            {isLoading && <Loader2 className='animate-spin size-4' />}
                        </Button>
                    </div>
                </form>
            </Form>

            <div className='text-center text-sm'>
                Already got an account?{" "}
                <Link
                    type='button'
                    href='/auth/signin'
                    prefetch
                    className='underline underline-offset-4'
                >
                    Sign in
                </Link>
            </div>
        </>
    );
}
