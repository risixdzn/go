"use client";

import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { useRouter } from "next/navigation";

export function BackButton({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : "button";
    const router = useRouter();

    return (
        <Comp
            data-slot='button'
            onClick={() => router.back()}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    );
}
