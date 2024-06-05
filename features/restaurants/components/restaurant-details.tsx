"use client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { StarIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useMounted } from "@/hooks/use-mounted";
import { useGetRestaurant } from "../api/use-get-restaurant";
import { UnavailableHint } from "@/components/unavailable-hint";
import { useRestaurantCommentsModal } from "../hooks/use-restaurant-comments-modal";

type RestaurantDetailsProps = {
    restaurantId: string;
};

export const RestaurantDetails = ({ restaurantId }: RestaurantDetailsProps) => {
    const restaurantQuery = useGetRestaurant(restaurantId);
    const mounted = useMounted();
    const { open } = useRestaurantCommentsModal();

    if (restaurantQuery.isLoading) {
        return <RestaurantDetailsSkeleton />;
    }
    if (restaurantQuery.isError) {
        return null;
    }
    if (!restaurantQuery.data) {
        return null;
    }
    const { imageUrl, name } = restaurantQuery.data.data.menu;
    const { foodCount } = restaurantQuery.data.data;
    const imageSrc = "/assets/brands/" + imageUrl;

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
                        <BreadcrumbPage>{name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex gap-4">
                <Image
                    src={imageSrc}
                    alt={name}
                    width={120}
                    height={120}
                    className="rounded-lg"
                />
                <div className="flex flex-col items-start">
                    <p className="text-3xl">{name}</p>
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

                        {foodCount === 0 && <UnavailableHint />}
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
                        <Skeleton className="h-5 w-20" />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Skeleton className="h-5 w-20" />
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <Skeleton className="h-5 w-20" />
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="flex gap-4">
                <Skeleton className="h-32 w-32 rounded-lg" />

                <div className="flex flex-col items-start">
                    <Skeleton className="h-8 w-40" />
                    <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-8" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
