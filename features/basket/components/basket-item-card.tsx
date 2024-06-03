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
            <CardContent className="flex items-center justify-between py-2 pl-2 pr-4">
                <div className="flex gap-2 items-center">
                    <Image
                        src={item.imageUrl}
                        alt={item.name + " " + item.description}
                        width={80}
                        height={80}
                        className="object-contain"
                    />
                    <div className="w-full">
                        <p className="text-semibold">{item.name} </p>
                        <p className="text-xs text-muted-foreground">
                            {item.description}{" "}
                        </p>
                    </div>
                </div>

                <div className="flex flex-col justify-between gap-2 ml-4 sm:ml-8">
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
                    <p className="text-muted-foreground text-sm italic text-end">
                        {item.price}x{amount} = {formatCurrency(basketItemTotal)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

//<p className="text-end text-muted-foreground">
//{formatCurrency(basketItemTotal)}
//</p>
