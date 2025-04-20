"use client";

import { LinkIcon, LogOut, Minimize2 } from "lucide-react";
import { Button } from "../ui/button";
import { SignoutButton } from "./signout-button";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { GoTextLogo } from "../go-text-logo";

export const navLinks = [
    { label: "Shorten", href: "/dashboard", icon: <Minimize2 /> },
    { label: "My links", href: "/dashboard/links", icon: <LinkIcon /> },
];

export function Nav() {
    const pathname = usePathname();

    return (
        <>
            <div className='max-md:flex hidden absolute w-full px-4 bg-background h-16 items-center'>
                <GoTextLogo className='w-12' />
                <span className='text-sm ml-2 -translate-y-0.5 text-muted-foreground'>
                    - Your own link shortener
                </span>
            </div>
            <div
                className={`
                fixed max-md:px-4 max-md:bottom-0 md:top-4 w-[calc(100%)]  md:w-[calc(100%-2rem)] left-1/2 -translate-x-1/2 gap-6
                bg-background h-16 border-border 
                flex flex-row-reverse md:flex-row items-center justify-between
            `}
            >
                <div className='flex gap-6 items-center'>
                    <GoTextLogo className='w-12 ml-6 hidden md:block' />
                    <div className='flex gap-2 items-center'>
                        {navLinks.map((link) => {
                            return (
                                <Link key={link.href} href={link.href}>
                                    <Button
                                        className='rounded-full'
                                        size='lg'
                                        variant={pathname === link.href ? "default" : "ghost"}
                                    >
                                        {link.icon}
                                        {link.label}
                                    </Button>
                                </Link>
                            );
                        })}
                    </div>
                </div>
                <div className='flex gap-0.5 items-center pr-2'>
                    <SignoutButton variant='ghost' className='rounded-full' size={"icon"}>
                        <LogOut />
                    </SignoutButton>
                </div>
            </div>
        </>
    );
}
