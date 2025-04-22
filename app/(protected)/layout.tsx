import type { Metadata } from "next";
import { Geist_Mono, DM_Sans, EB_Garamond } from "next/font/google";
import "../globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Nav } from "@/components/dashboard/nav";
import { QueryClientWrapper } from "@/lib/query-client";

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
    title: "go - Dashboard",
    description: "Manage your shortened links",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <QueryClientWrapper>
            <html lang='en'>
                <body
                    className={`${geistMono.variable} ${DMSans.variable} ${ebGaramond.variable} antialiased font-sans`}
                >
                    <Nav />
                    <main className='w-full max-w-2xl mx-auto px-4'>{children}</main>
                    <Toaster />
                </body>
            </html>
        </QueryClientWrapper>
    );
}
