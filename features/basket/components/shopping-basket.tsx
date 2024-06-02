"use client";

import { Button } from "@/components/ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import { useBasketSheet } from "../hooks/use-basket-sheet";
import { useBasket } from "../hooks/use-basket";

export const ShoppingBasket = () => {
    const itemAmount = useBasket((state) => state.items.length);
    const basketSheet = useBasketSheet();
    return (
        <Button
            size="icon"
            variant="outline"
            className="flex items-center justify-center rounded-full cursor-pointer "
            onClick={() => {
                basketSheet.open();
            }}
        >
            <div className="size-6 relative">
                <ShoppingBasketIcon className="text-primary " />
                {itemAmount > 0 && (
                    <div className="absolute -right-2 -top-1 flex items-center justify-center overflow-hidden rounded-full bg-primary text-xs size-5 text-secondary">
                        {itemAmount}
                    </div>
                )}
            </div>
        </Button>
    );
};
