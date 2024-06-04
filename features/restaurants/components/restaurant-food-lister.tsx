"use client";

import { useGetRestaurant } from "../api/use-get-restaurant";
import { FoodLister } from "./food-lister";
import { Loader2Icon } from "lucide-react";
import { ServerErrorMessage } from "@/components/server-error-message";
import { NotFoundMessage } from "@/components/not-found-message";

type RestaurantFoodListerProps = {
    restaurantId?: string;
};

export const RestaurantFoodLister = ({
    restaurantId,
}: RestaurantFoodListerProps) => {
    const restaurantQuery = useGetRestaurant(restaurantId);

    if (restaurantQuery.isLoading) {
        return (
            <div className="flex w-full items-center justify-center pt-16">
                <Loader2Icon className="loading-icon" />
            </div>
        );
    }
    if (restaurantQuery.isError) {
        return <ServerErrorMessage />;
    }
    if (restaurantQuery.data?.data.foods.length === 0) {
        //return <NotFoundMessage />;
        return <div>no foods available</div>
    }
    if (!restaurantQuery.data?.metadata || !restaurantQuery.data?.data) {
        return null;
    }
    return <FoodLister metadata={restaurantQuery.data.metadata} data={restaurantQuery.data.data.foods} />;
};
