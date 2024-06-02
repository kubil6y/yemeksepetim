"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, maxChar } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useBasket } from "@/features/basket/hooks/use-basket";

type FoodCardProps = {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    restaurantName: string;
    showRestaurantName?: boolean;
};

export const FoodCard = ({
    id,
    name,
    description,
    imageUrl,
    price,
    restaurantName,
    showRestaurantName = true,
}: FoodCardProps) => {
    const { addItem } = useBasket();
    const imageSrc = "/assets/" + imageUrl;

    function handleAddBasketItem() {
        // TODO leftoff
        console.log(id);
        //addItem({
            //id,
            //name,
        //}, 1);
    }

    return (
        <Card className="relative w-full shrink-0 overflow-hidden rounded-lg shadow-lg">
            <div className="absolute right-4 top-4 flex cursor-pointer items-center justify-center rounded-full border p-2 shadow-lg transition-colors hover:bg-accent">
                <PlusIcon className="size-5 text-primary" onClick={handleAddBasketItem}/>
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
                                <div className="text-lg xl:text-xl">
                                    {maxChar(restaurantName, 18)}
                                </div>
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
