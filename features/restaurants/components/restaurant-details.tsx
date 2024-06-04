"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { useGetRestaurant } from "../api/use-get-restaurant";
import Link from "next/link";
import Image from "next/image";
import { UnavailableHint } from "@/components/unavailable-hint";
import { StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { useRestaurantCommentsModal } from "../hooks/use-restaurant-comments-modal";
import { Skeleton } from "@/components/ui/skeleton";

type RestaurantDetailsProps = {
    restaurantId: string;
};

// TODO
export const RestaurantDetails = ({ restaurantId }: RestaurantDetailsProps) => {
    const restaurantQuery = useGetRestaurant(restaurantId);
    const mounted = useMounted();
    const { open } = useRestaurantCommentsModal();

    if (restaurantQuery.isLoading) {
    //if (true) {
        return <RestaurantDetailsSkeleton/>;
    }
    if (restaurantQuery.isError) {
        return null;
    }
    if (!restaurantQuery.data?.data) {
        return null;
    }
    const { restaurant } = restaurantQuery.data.data;
    const imageSrc = "/assets/brands/" + restaurant.imageUrl;

    if (!mounted) {
        return;
    }

    return (
        <div className="space-y-4 py-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Link href="/restaurants">Restaurants</Link>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{restaurant.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex gap-4">
                <Image
                    src={imageSrc}
                    alt={restaurant.name}
                    width={120}
                    height={120}
                    className="rounded-lg"
                />
                <div className="flex flex-col items-start">
                    <p className="text-3xl">{restaurant.name}</p>
                    <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                            <StarIcon className="size-4 fill-primary text-primary" />
                            <div className="flex items-center gap-2 text-sm">
                                <p className="text-primary">
                                    2.9/5{" "}
                                    <span className="text-muted-foreground">
                                        (+13000)
                                    </span>
                                </p>
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-primary hover:text-primary"
                                    onClick={() => open(restaurantId)}
                                >
                                    Comments
                                </Button>
                            </div>
                        </div>

                        {restaurantQuery.data &&
                            restaurantQuery.data.data.foods.length === 0 && (
                                <UnavailableHint />
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

function RestaurantDetailsSkeleton() {
    return (
        <div className="space-y-4 py-4">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <Skeleton className="w-20 h-5" />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Skeleton className="w-20 h-5" />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Skeleton className="w-20 h-5" />
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex gap-4">
                <Skeleton className="w-32 h-32 rounded-lg" />

                <div className="flex flex-col items-start">
                    <Skeleton className="h-8 w-40" />
                    <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Skeleton className="w-24 h-4"/>
                                <Skeleton className="w-8 h-4"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
