import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import "./globals.css";

const font = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "YemekSepetim Clone",
    description: "Next14/hono yemeksepetim clone",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <QueryProvider>
                    <body className={font.className}>
                        {children}
                    </body>
                </QueryProvider>
            </html>
        </ClerkProvider>
    );
}
