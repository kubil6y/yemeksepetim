"use client";

import { useGetFoods } from "../api/use-get-foods";
import { FoodLister } from "./food-lister";

export const FoodListerWrapper = () => {
    const foodsQuery = useGetFoods();
    return <FoodLister query={foodsQuery} />;
};
