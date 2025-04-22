import type { Metadata } from "next";
import { Geist_Mono, DM_Sans, EB_Garamond } from "next/font/google";
import "../globals.css";
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
                    {children}
                </div>
                <Toaster />
            </body>
        </html>
    );
}
