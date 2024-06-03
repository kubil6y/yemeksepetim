"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import { useBasketSheet } from "../hooks/use-basket-sheet";
import { useBasketItemCount } from "../hooks/use-basket";

export const ShoppingBasket = () => {
    const basketItemCount = useBasketItemCount();
    const basketSheet = useBasketSheet();
    return (
        <Button
            size="icon"
            variant="outline"
            className="flex cursor-pointer items-center justify-center rounded-full"
            onClick={() => {
                basketSheet.open();
            }}
        >
            <div className="size-6 relative">
                <ShoppingBasketIcon className="text-primary" />
                {basketItemCount > 0 && (
                    <div className="size-5 absolute -right-3.5 -top-3.5 flex items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-secondary">
                        {basketItemCount}
                    </div>
                )}
            </div>
        </Button>
    );
};
