"use client";

import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { authClient } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export function SignoutButton({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const [loading, setLoading] = useState(false);

    const Comp = asChild ? Slot : "button";
    const router = useRouter();

    const signOut = async () => {
        setLoading(true);
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/auth/signin"); // redirect to login page
                },
            },
        });
    };

    return (
        <Comp
            data-slot='button'
            onClick={() => signOut()}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        >
            {!loading ? props.children : <Loader2 className='animate-spin' />}
        </Comp>
    );
}
