"use client";

import { useGetFoods } from "../api/use-get-foods";
import { FoodLister } from "./food-lister";

export const FoodListerWrapper = () => {
    const foods = useGetFoods();
    return <FoodLister query={foods} />;
};
