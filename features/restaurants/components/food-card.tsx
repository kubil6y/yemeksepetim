"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, maxChar } from "@/lib/utils";

type FoodCardProps = {
    name: string;
    description: string;
    imageUrl: string;
    price: number;
};

export const FoodCard = ({
    name,
    description,
    imageUrl,
    price,
}: FoodCardProps) => {
    const imageSrc = "/assets/" + imageUrl;
    return (

        <Card className="w-full shrink-0 overflow-hidden rounded-lg shadow-lg cursor-pointer">
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
                <div
                    className="flex flex-col items-start justify-center p-2"
                >
                    <div className="flex w-full items-center justify-between text-sm">
                        <div className=" w-3/4 font-semibold">
                            {maxChar(name, 18)}
                        </div>
                        <p className="text-lg text-primary">
                            {formatCurrency(price)}
                        </p>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
                </div>
            </CardContent>
        </Card>
    );
};