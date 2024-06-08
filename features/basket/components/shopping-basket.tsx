"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ShoppingBasketIcon } from "lucide-react";
import { useBasketSheet } from "../hooks/use-basket-sheet";
import { useBasketItemCount, useBasketNestedItemsCount } from "../hooks/use-basket";
import { useEffect, useState } from "react";

export const ShoppingBasket = () => {
    const basketItemCount = useBasketItemCount();
    const basketSheet = useBasketSheet();
    const nestedItemsCount = useBasketNestedItemsCount();
    const [pulse, setPulse] = useState<boolean>(false);

    useEffect(() => {
        setPulse(true);
        setTimeout(() => {
            setPulse(false);
        }, 510);
    }, [nestedItemsCount])

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
                    <div className={cn("size-5 absolute -right-3.5 -top-3.5 flex items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-semibold text-secondary", pulse && "animate-pulse duration-500")}>
                        {basketItemCount}
                    </div>
                )}
            </div>
        </Button>
    );
};
