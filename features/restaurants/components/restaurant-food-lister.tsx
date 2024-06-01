"use client";

import { notFound } from "next/navigation";
import { useGetFoods } from "../api/use-get-foods";
import { useGetRestaurant } from "../api/use-get-restaurant";
import { FoodLister } from "./food-lister";
import { Loader2Icon } from "lucide-react";

type RestaurantFoodListerProps = {
    restaurantId?: string;
};

export const RestaurantFoodLister = ({
    restaurantId,
}: RestaurantFoodListerProps) => {
    const foodsQuery = useGetFoods();
    const restaurantQuery = useGetRestaurant(restaurantId);
    return <FoodLister query={foodsQuery} />;
};
