"use client";

import {
    FilterDesktop,
    FilterModalButton,
} from "@/features/restaurants/components/filters";
import { Input } from "@/components/ui/input";
import { useGetFoods } from "@/features/restaurants/api/use-get-foods";
import { FoodCard } from "@/features/restaurants/components/food-card";

export default function RestaurantsPage() {
    const foods = useGetFoods();
    return (
        <div className="container">
            <div className="flex w-full gap-10">
                <FilterDesktop />

                <div className="w-full pt-24 lg:pt-32">
                    <div className="flex items-center gap-2">
                        <Input
                            className="h-16 w-full rounded-full bg-accent px-6 focus:bg-white"
                            placeholder="TODO: Search Input"
                        />

                        <div className="block lg:hidden">
                            <FilterModalButton />
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 p-2">
                            {foods.data?.map((food) => (
                                <FoodCard {...food} key={food.id}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
