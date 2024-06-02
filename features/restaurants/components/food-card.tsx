"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatCurrency, maxChar } from "@/lib/utils";

type FoodCardProps = {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
    restaurantName: string;
    showRestaurantName?: boolean;
};

export const FoodCard = ({
    name,
    description,
    imageUrl,
    price,
    restaurantName,
    showRestaurantName = true,
}: FoodCardProps) => {
    const imageSrc = "/assets/" + imageUrl;
    return (
        <Card className="w-full shrink-0 overflow-hidden rounded-lg shadow-lg">
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
                                <div className="text-lg xl:text-xl text-primary">
                                    {maxChar(restaurantName, 18)}
                                </div>
                            )}
                            <div className={cn(showRestaurantName ? "" : "")}>
                                {maxChar(name, 18)}
                            </div>
                        </div>
                        <p className="text-xl sm:text-2xl text-primary">
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
