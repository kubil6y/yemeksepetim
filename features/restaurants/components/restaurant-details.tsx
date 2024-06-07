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
import { useRestaurantReviewsModal } from "../hooks/use-restaurant-reviews-modal";
import { ServerErrorMessage } from "@/components/server-error-message";

type RestaurantDetailsProps = {
    restaurantId: string;
};

export const RestaurantDetails = ({ restaurantId }: RestaurantDetailsProps) => {
    const restaurantQuery = useGetRestaurant(restaurantId);
    const mounted = useMounted();
    const { open } = useRestaurantReviewsModal();

    if (restaurantQuery.isLoading) {
        return <RestaurantDetailsSkeleton />;
    }
    if (restaurantQuery.isError) {
        return <ServerErrorMessage />;
    }
    if (!restaurantQuery.data) {
        return null;
    }
    if (!mounted) {
        return null;
    }

    const { imageUrl, name, averageScore, reviewCount } = restaurantQuery.data.data.restaurant;
    const { foodCount } = restaurantQuery.data.data;
    const imageSrc = "/assets/brands/" + imageUrl;

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
                                    {averageScore ? averageScore.toFixed(2) : 0} / 5{" "}
                                    <span className="text-muted-foreground italic">
                                        ({reviewCount ?? 0} Reviews)
                                    </span>
                                </p>
                            </div>
                        </div>

                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-primary hover:text-primary"
                            onClick={() => open(restaurantId, name, imageSrc)}
                        >
                            Reviews
                        </Button>
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
