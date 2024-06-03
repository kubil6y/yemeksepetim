"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { BasketItem, useBasket, useBasketItemTotal } from "../hooks/use-basket";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";

type BasketItemCardProps = {
    basketItem: BasketItem;
};

export const BasketItemCard = ({ basketItem }: BasketItemCardProps) => {
    const { id, amount, item } = basketItem;
    const { addItem, removeItem, deleteItem } = useBasket();
    const basketItemTotal = useBasketItemTotal(id);

    return (
        <Card>
            <CardContent className="flex items-center justify-between p-2">
                <div className="flex items-center gap-1 sm:gap-2">
                    <div className="flex flex-col items-center gap-1 sm:hidden">
                        <Button
                            size="icon"
                            onClick={() => addItem(item)}
                            className="size-5 rounded-full"
                        >
                            <PlusIcon className="size-4" />
                        </Button>

                        <span className="w-4 text-center text-sm">
                            {amount}
                        </span>

                        <Button
                            size="icon"
                            onClick={() => removeItem(id)}
                            className="size-5 rounded-full"
                        >
                            <MinusIcon className="size-4" />
                        </Button>
                    </div>

                    <Image
                        src={item.imageUrl}
                        alt={item.name + " " + item.description}
                        width={60}
                        height={60}
                        className="object-contain"
                    />

                    <div className="w-full">
                        <p className="text-semibold line-clamp-1 sm:line-clamp-2">{item.name} </p>
                        <p className="line-clamp-1 sm:line-clamp-3 text-xs text-muted-foreground">
                            {item.description}{" "}
                        </p>
                    </div>
                </div>

                <div className="ml-4 hidden flex-col justify-between gap-2 sm:ml-8 sm:flex">
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            size="icon"
                            onClick={() => addItem(item)}
                            className="size-6 rounded-full"
                        >
                            <PlusIcon className="size-5" />
                        </Button>

                        <span className="w-4 text-center text-lg font-semibold">
                            {amount}
                        </span>

                        <Button
                            size="icon"
                            onClick={() => removeItem(id)}
                            className="size-6 rounded-full"
                        >
                            <MinusIcon className="size-5" />
                        </Button>

                        <Button
                            size="icon"
                            onClick={() => deleteItem(id)}
                            className="size-7 ml-4"
                            variant="destructive"
                        >
                            <TrashIcon className="size-4" />
                        </Button>
                    </div>
                    <p className="text-end text-sm italic text-muted-foreground">
                        {item.price}x{amount} ={" "}
                        {formatCurrency(basketItemTotal)}
                    </p>
                </div>

                <div className="flex flex-col sm:hidden shrink-0 gap-2 items-center">
                    <Button
                        size="icon"
                        onClick={() => deleteItem(id)}
                        className="size-6 flex items-center justify-center rounded-full "
                        variant="destructive"
                    >
                        <TrashIcon className="size-3" />
                    </Button>

                    <p className="text-end text-sm italic text-muted-foreground">
                        {formatCurrency(basketItemTotal)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
