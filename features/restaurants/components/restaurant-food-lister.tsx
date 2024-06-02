"use client";

import { useGetFoods } from "../api/use-get-foods";
import { useGetRestaurant } from "../api/use-get-restaurant";
import { FoodLister } from "./food-lister";
import { Loader2Icon } from "lucide-react";
import { NotFoundMessage } from "@/components/not-found-message";
import { ServerErrorMessage } from "@/components/server-error-message";

type RestaurantFoodListerProps = {
    restaurantId?: string;
};

export const RestaurantFoodLister = ({
    restaurantId,
}: RestaurantFoodListerProps) => {
    const foodsQuery = useGetFoods();
    const restaurantQuery = useGetRestaurant(restaurantId);
    if (foodsQuery.isLoading) {
        return (
            <div className="flex w-full items-center justify-center pt-16">
                <Loader2Icon className="loading-icon" />
            </div>
        );
    }
    if (foodsQuery.isError) {
        return <ServerErrorMessage />;
    }
    if (foodsQuery.data?.data.length === 0) {
        return <NotFoundMessage />;
    }
    if (!foodsQuery.data?.metadata || !foodsQuery.data?.data) {
        return null;
    }
    return <FoodLister metadata={foodsQuery.data.metadata} data={foodsQuery.data.data} />;
};
