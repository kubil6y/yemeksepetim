"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, maxChar } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { FoodItem, useBasket } from "@/features/basket/hooks/use-basket";

type FoodCardProps = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    restaurantId: string;
    restaurantName: string;
    showRestaurantName?: boolean;
};

export const FoodCard = ({
    id,
    name,
    description,
    imageUrl,
    price,
    restaurantId,
    restaurantName,
    showRestaurantName = true,
}: FoodCardProps) => {
    const { addItem } = useBasket();
    const imageSrc = "/assets/" + imageUrl;

    function handleAddBasketItem() {
        const food: FoodItem = {
            id,
            name,
            description,
            imageUrl: imageSrc,
            price,
            restaurantName,
        };
        addItem(food);
    }

    return (
        <Card className="relative w-full shrink-0 overflow-hidden rounded-lg shadow-lg">
            <div className="absolute right-4 top-4 flex cursor-pointer items-center justify-center rounded-full border p-2 text-primary shadow-lg transition-colors hover:bg-accent active:bg-primary active:text-secondary">
                <PlusIcon onClick={handleAddBasketItem} />
            </div>
            <CardContent className="p-2.5">
                <div className="item-center flex w-full justify-center">
                    <Image
                        className="h-full object-contain"
                        src={imageSrc}
                        height={120}
                        width={120}
                        alt={name}
                    />
                </div>
                <div className="flex flex-col items-start justify-center p-2">
                    <div className="flex w-full items-center justify-between text-sm">
                        <div className="flex w-4/5 flex-col font-semibold">
                            {showRestaurantName && (
                                <Link href={`/restaurant/${restaurantId}`} className="text-lg xl:text-xl hover:underline">
                                    {maxChar(restaurantName, 18)}
                                </Link>
                            )}
                            <div className={cn(showRestaurantName ? "" : "")}>
                                {maxChar(name, 18)}
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl">
                            {formatCurrency(price)}
                        </p>
                    </div>
                    <p className="line-clamp-2 text-xs text-muted-foreground">
                        {description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
