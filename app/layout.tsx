import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { ModalProvider } from "@/providers/modal-provider";
import "./globals.css";
import { Toaster } from "sonner";

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
                        <Toaster position="top-center" />
                        <ModalProvider />
                        <SheetProvider />
                        {children}
                    </body>
                </QueryProvider>
            </html>
        </ClerkProvider>
    );
}
