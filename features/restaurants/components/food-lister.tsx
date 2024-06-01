"use client";

import { FoodCard } from "./food-card";
import { UseQueryResult } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { ServerErrorMessage } from "@/components/server-error-message";
import { NotFoundMessage } from "@/components/not-found-message";
import { CustomPagination } from "./custom-pagination";

type FoodListerProps = {
    query: UseQueryResult<
        {
            metadata:
            | {
                current_page: number;
                page_size: number;
                first_page: number;
                last_page: number;
                total_records: number;
            }
            | undefined;
            data: {
                id: string;
                name: string;
                description: string;
                imageUrl: string;
                price: number;
            }[];
        },
        Error
    >;
};

export const FoodLister = ({ query }: FoodListerProps) => {
    if (query.isLoading) {
        return (
            <div className="flex w-full items-center justify-center pt-16">
                <Loader2Icon className="loading-icon" />
            </div>
        );
    }
    if (query.isError) {
        return <ServerErrorMessage />;
    }
    if (query.data?.data.length === 0) {
        return <NotFoundMessage />;
    }
    return (
        <div className="space-y-8">
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {query.data?.data.map((food) => (
                    <FoodCard {...food} key={food.id} />
                ))}
            </div>
            {query.data?.metadata && (
                <CustomPagination metadata={query.data.metadata} />
            )}
        </div>
    );
};
