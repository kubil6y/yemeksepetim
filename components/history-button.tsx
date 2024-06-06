"use client";

import {
    ClerkLoading,
    ClerkLoaded,
    SignedIn,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";
import { HistoryIcon, Loader2Icon } from "lucide-react";

export const HistoryButton = () => {
    return (
        <>
            <ClerkLoading>
                <Loader2Icon className="loading-icon" />
            </ClerkLoading>
            <ClerkLoaded>
                <SignedIn>
                    <Button
                        size="icon"
                        variant="outline"
                        className="flex cursor-pointer items-center justify-center rounded-full"
                        asChild
                    >
                        <Link href="/orders">
                            <HistoryIcon className="size-5 text-primary" />
                        </Link>
                    </Button>
                </SignedIn>
            </ClerkLoaded>
        </>
    );
};
