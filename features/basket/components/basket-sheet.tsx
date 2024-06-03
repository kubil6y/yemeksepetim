"use client";

import {
    useBasket,
    useBasketItemCount,
    useBasketTotal,
} from "../hooks/use-basket";
import {
    CreditCardIcon,
    ShoppingBagIcon,
    TrashIcon,
    XIcon,
} from "lucide-react";
import { useConfirm } from "@/hooks/use-confirm";
import { BasketItemCard } from "./basket-item-card";
import { formatCurrency } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useBasketSheet } from "../hooks/use-basket-sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

export const BasketSheet = () => {
    const basket = useBasket();
    const basketSheet = useBasketSheet();
    const basketTotal = useBasketTotal();
    const basketItemCount = useBasketItemCount();

    const [ClearConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to clear your basket."
    );

    async function handleClearBasket() {
        const ok = await confirm();
        if (ok) {
            basket.clearItems();
        }
    }
    return (
        <>
            <ClearConfirmDialog />
            <Sheet open={basketSheet.isOpen} onOpenChange={basketSheet.close}>
                <SheetContent className="flex flex-col justify-between">
                    <div>
                        {/* SHEET HEADER */}
                        <div className="flex items-center justify-between w-full py-4">
                            <p className="text-xl sm:text-3xl font-semibold">
                                Shopping Card
                            </p>
                            <Icons.logo className="block" />
                        </div>

                        {/* TODO leftoff */}
                        <ScrollArea className="w-full h-[60vh] border p-1 rounded-lg">
                            {basketItemCount === 0 ? (
                                <div className="mt-12 flex w-full items-center justify-center bg-white p-5">
                                    <div className="space-y-5 text-center">
                                        <div className="inline-flex rounded-full bg-red-100 p-4">
                                            <div className="rounded-full bg-red-200 stroke-red-600 p-4">
                                                <ShoppingBagIcon className="text-red-500" />
                                            </div>
                                        </div>
                                        <div className="text-muted-foreground lg:text-lg">
                                            <p>Your shopping cart is empty.</p>
                                            <p>
                                                Browse our products and add some
                                                items!
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full space-y-4">
                                    {basket.items.map((basketItem) => (
                                        <BasketItemCard
                                            key={basketItem.id}
                                            basketItem={basketItem}
                                        />
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </div>

                    {basketItemCount == 0 ? (
                        <footer className="flex flex-col items-center">
                            <Button
                                className="w-full uppercase tracking-wider"
                                onClick={basketSheet.close}
                            >
                                <XIcon className="mr-2" />
                                Close
                            </Button>
                        </footer>
                    ) : (
                        <footer className="flex flex-col space-y-4">
                            <div className="text-end text-lg md:text-5xl">
                                Total {formatCurrency(basketTotal)}
                            </div>
                            <div className="w-full space-y-2 items-center">
                                <Button
                                    className="w-full uppercase tracking-wider"
                                    onClick={() =>
                                        console.log("TODO", basket.items)
                                    }
                                >
                                    <CreditCardIcon className="mr-2" />
                                    Checkout
                                </Button>
                                <Button
                                    className="w-full"
                                    variant="destructive"
                                    onClick={handleClearBasket}
                                >
                                    <TrashIcon className="mr-2" />
                                    Clear All
                                </Button>
                            </div>
                        </footer>
                    )}
                </SheetContent>
            </Sheet>
        </>
    );
};
