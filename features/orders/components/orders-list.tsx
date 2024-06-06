"use client";

import Image from "next/image";
import Link from "next/link";
import { CookingPotIcon, GalleryVerticalEnd, HomeIcon } from "lucide-react";
import { format } from "date-fns";
import { useGetOrders } from "../api/use-get-orders";
import { formatCurrency } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ServerErrorMessage } from "@/components/server-error-message";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export const OrdersList = () => {
    const ordersQuery = useGetOrders();
    if (ordersQuery.isLoading) {
        return (
            <div className="mt-8 space-y-2">
                {new Array(2).fill(null).map((_, index) => (
                    <OrderCardSkeleton key={index} />
                ))}
            </div>
        );
    }
    if (ordersQuery.isError) {
        return <ServerErrorMessage />;
    }
    if (ordersQuery.data?.length === 0) {
        return <EmptyOrderHistory />;
    }
    return (
        <div className="mt-8 space-y-4 pb-24">
            {ordersQuery.data?.map((order) => {
                let total = 0;
                for (const item of order.items) {
                    total += item.price;
                }
                return (
                    <Card key={order.orderId} className="p-2">
                        <CardContent className="space-y-2">
                            {order.items.map((orderItem) => (
                                <OrderCard key={orderItem.id} {...orderItem} />
                            ))}
                        </CardContent>

                        <div className="flex items-center justify-between px-2 sm:px-8">
                            <p className="text-lg">
                                {format(order.createdAt, "MMMM dd, yyyy HH:mm")}
                            </p>
                            <p className="text-lg md:text-2xl">
                                Total {formatCurrency(total)}
                            </p>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};

type OrderCardProps = {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    restaurantId: string;
};

function OrderCard({
    name,
    description,
    price,
    imageUrl,
    restaurantId,
}: OrderCardProps) {
    const imageSrc = "/assets/" + imageUrl;
    const href = "/restaurant/" + restaurantId;
    return (
        <Card className="h-full w-full">
            <CardContent className="grid h-full w-full grid-cols-6 items-center gap-4 p-0">
                <div className="col-span-1 flex items-center justify-center">
                    <Image
                        src={imageSrc}
                        height={80}
                        width={80}
                        alt={name}
                        className="block object-contain"
                    />
                </div>

                <div className="col-span-3">
                    <Link
                        href={href}
                        className="text-lg font-semibold underline"
                    >
                        {name}
                    </Link>
                    <p className="line-clamp-2 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>

                <div>
                    <Badge className="bg-emerald-500 hover:bg-emerald">delivered</Badge>
                </div>

                <p className="text-center text-lg">{formatCurrency(price)}</p>
            </CardContent>
        </Card>
    );
}

function OrderCardSkeleton() {
    return (
        <Card className="p-2">
            <CardContent className="space-y-2">
                {new Array(2).fill(null).map((_, index) => (
                    <OrderItemCardSkeleton key={index} />
                ))}
            </CardContent>

            <div className="flex items-center justify-between px-8">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="w-30 h-16" />
            </div>
        </Card>
    );
}

function OrderItemCardSkeleton() {
    return (
        <Card className="h-full w-full">
            <CardContent className="grid h-full w-full grid-cols-7 items-center gap-4 p-4">
                <Skeleton className="size-20 col-span-1 flex items-center justify-center" />

                <div className="col-span-3 space-y-2">
                    <Skeleton className="h-10 w-1/3 " />
                    <Skeleton className="h-8 w-3/4 " />
                </div>

                <div>
                    <Skeleton className="h-8 w-20" />
                </div>

                <Skeleton className="h-8 w-32" />

                <div className="flex items-center justify-center">
                    <Skeleton className="h-12 w-12" />
                </div>
            </CardContent>
        </Card>
    );
}

function EmptyOrderHistory() {
    return (
        <div className="flex h-60 w-full flex-col items-center justify-center gap-12">
            <div className="inline-flex rounded-full bg-red-100 p-4">
                <div className="rounded-full bg-red-200 stroke-red-600 p-4">
                    <GalleryVerticalEnd className="text-red-500" />
                </div>
            </div>
            <p className="text-3xl font-semibold sm:text-5xl">
                You have not shopped yet!
            </p>

            <div className="flex w-full justify-center gap-2 ">
                <Button asChild className="w-1/2 sm:w-auto">
                    <Link href="/restaurants">
                        <CookingPotIcon className="size-5 mr-2.5 text-primary-foreground" />
                        Restaurants
                    </Link>
                </Button>

                <Button asChild className="w-1/2 sm:w-auto">
                    <Link href="/">
                        <HomeIcon className="size-5 mr-2.5 text-primary-foreground" />
                        Home
                    </Link>
                </Button>
            </div>
        </div>
    );
}
