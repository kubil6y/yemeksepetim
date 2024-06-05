"use client";

import {
    CalendarX2,
    CookingPotIcon,
    HomeIcon,
    Loader2Icon,
} from "lucide-react";
import { FoodLister } from "./food-lister";
import { ServerErrorMessage } from "@/components/server-error-message";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useGetRestaurantMenu } from "../api/use-get-restaurant-menu";

type RestaurantFoodListerProps = {
    restaurantId?: string;
};

export const RestaurantFoodLister = ({
    restaurantId,
}: RestaurantFoodListerProps) => {
    const menuQuery = useGetRestaurantMenu(restaurantId);
    if (menuQuery.isLoading) {
        return (
            <div className="flex w-full items-center justify-center pt-16">
                <Loader2Icon className="loading-icon" />
            </div>
        );
    }
    if (menuQuery.isError) {
        return <ServerErrorMessage />;
    }
    if (menuQuery.data?.data.length === 0) {
        return (
            <div className="flex flex-col gap-12 items-center justify-center w-full h-60">
                <div className="inline-flex rounded-full bg-red-100 p-4">
                    <div className="rounded-full bg-red-200 stroke-red-600 p-4">
                        <CalendarX2 className="text-red-500" />
                    </div>
                </div>
                <p className="text-3xl sm:text-5xl font-semibold">
                    Kitchen is closed :(
                </p>

                <div className="flex justify-center gap-2 w-full ">
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
    if (!menuQuery.data?.metadata || !menuQuery.data?.data) {
        return null;
    }
    return (
        <div className="mt-2">
            <h2 className="text-xl sm:text-3xl">Our Offerings</h2>
            <FoodLister
                metadata={menuQuery.data.metadata}
                data={menuQuery.data.data}
            />
        </div>
    );
};
