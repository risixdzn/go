import type { Metadata } from "next";
import { Geist_Mono, DM_Sans, EB_Garamond } from "next/font/google";
import "../globals.css";
import { Wind } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

const DMSans = DM_Sans({
    variable: "--font-dm-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

const ebGaramond = EB_Garamond({
    variable: "--font-eb-garamond",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "go - Link shortener",
    description: "The fastest way to self-host a URL shortener.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body
                className={`${geistMono.variable} ${DMSans.variable} ${ebGaramond.variable} antialiased font-sans`}
            >
                <div className='flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10'>
                    <div className='w-full max-w-sm'>
                        <div className={"flex flex-col gap-6"}>
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col items-center gap-2'>
                                    <h1 className='text-2xl font-bold font-title inline-flex gap-1 items-end'>
                                        <Wind className='flip' /> go
                                    </h1>
                                    <div className='text-center text-sm'>
                                        The <span className='italic font-semibold'>fastest</span>{" "}
                                        way to self-host a URL shortener.
                                    </div>
                                </div>
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </body>
        </html>
    );
}
