"use client";

import { FoodCard } from "./food-card";
import { UseQueryResult } from "@tanstack/react-query";
import {Loader2Icon} from "lucide-react";
import { ServerErrorMessage } from "@/components/server-error-message";

type FoodListerProps = {
    query: UseQueryResult<
        {
            id: string;
            name: string;
            description: string;
            imageUrl: string;
            price: number;
        }[],
        Error
    >;
};

export const FoodLister = ({ query }: FoodListerProps) => {
    if (query.isError) {
        return <ServerErrorMessage />;
    }
    if (query.isLoading) {
        return (
            <div className="flex w-full items-center justify-center pt-24">
                <Loader2Icon className="loading-icon" />
            </div>
        );
    }
    return (
        <div className="mt-8 grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {query.data?.map((food) => (
                <FoodCard {...food} key={food.id} />
            ))}
        </div>
    );
};
