"use client";

import { useGetFoods } from "../api/use-get-foods";
import { FoodLister } from "./food-lister";
import { Loader2Icon } from "lucide-react";
import { ServerErrorMessage } from "@/components/server-error-message";
import { NotFoundMessage } from "@/components/not-found-message";

export const MainFoodLister = () => {
    const query = useGetFoods();
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
        return <NotFoundMessage message="Please try another category." />;
    }
    if (!query.data?.metadata || !query.data?.data) {
        return null;
    }
    return <FoodLister metadata={query.data.metadata} data={query.data.data} />;
};
