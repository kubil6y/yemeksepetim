import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import { ModalProviders } from "@/providers/modal-providers";

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
            <html lang="en" suppressHydrationWarning>
                <QueryProvider>
                    <body className={font.className}>
                        {children}
                        <ModalProviders />
                    </body>
                </QueryProvider>
            </html>
        </ClerkProvider>
    );
}
