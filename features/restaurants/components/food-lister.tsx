"use client";

import { FoodCard } from "./food-card";
import { CustomPagination } from "./custom-pagination";

type FoodListerProps = {
    metadata: {
        current_page: number;
        page_size: number;
        first_page: number;
        last_page: number;
        total_records: number;
    };
    data: {
        id: string;
        name: string;
        description: string;
        imageUrl: string;
        price: number;
        restaurantName: string;
    }[];
};

export const FoodLister = ({ metadata, data }: FoodListerProps) => {
    return (
        <div className="space-y-8">
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {data.map((food) => (
                    <FoodCard {...food} key={food.id} />
                ))}
            </div>
            <CustomPagination metadata={metadata} />
        </div>
    );
};
