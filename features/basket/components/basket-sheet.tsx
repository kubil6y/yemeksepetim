"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";
import { useBasketSheet } from "../hooks/use-basket-sheet";

export const BasketSheet = () => {
    const basketSheet = useBasketSheet();
    return (
        <Sheet open={basketSheet.isOpen} onOpenChange={basketSheet.close}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>New Account</SheetTitle>
                </SheetHeader>
                <SheetDescription>
                    Create a new account to track your transactions.
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}
