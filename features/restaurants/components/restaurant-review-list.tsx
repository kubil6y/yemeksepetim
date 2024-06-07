"use client";

import { useGetRestaurantReviews } from "@/features/reviews/api/use-get-restaurant-reviews";
import {
    ChefHatIcon,
    Loader2Icon,
    ServerCrashIcon,
    StarIcon,
} from "lucide-react";
import { format, formatRelative } from "date-fns";
import { cn } from "@/lib/utils";

type RestauantReviewsListProps = {
    restaurantId?: string;
};

export const RestauantReviewsList = ({
    restaurantId,
}: RestauantReviewsListProps) => {
    const reviewsQuery = useGetRestaurantReviews(restaurantId);
    if (reviewsQuery.isLoading) {
        return (
            <div className="flex w-full items-center justify-center h-12">
                <Loader2Icon className="loading-icon" />
            </div>
        );
    }
    if (reviewsQuery.isError) {
        return (
            <div className="flex w-full items-center justify-center h-12">
                <ServerCrashIcon className="size-4 mr" /> No reviews
            </div>
        );
    }
    if (reviewsQuery.data?.data.length === 0) {
        return (
            <div className="flex w-full items-center justify-center h-12">
                <ChefHatIcon className="size-4 mr" /> No reviews
            </div>
        );
    }
    return (
        <div className="space-y-4">
            {reviewsQuery.data?.data.map((review) => {
                return (
                    <div
                        className="bg-rose-50 rounded-lg shadow p-2"
                        key={review.id}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="font-semibold">{review.username}</p>
                                {review.score > 0 && (
                                    <div className="flex items-center gap-0.5">
                                        {new Array(5).fill(null).map((_, index) => {
                                            let filled = (index + 1) <= review.score;
                                            return (
                                                <StarIcon
                                                    key={`${review.id}_${index}`}
                                                    className={cn(
                                                        "size-4 text-primary",
                                                        filled && "fill-primary"
                                                    )}
                                                />
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                            <p className="text-muted-foreground text-sm">
                                {formatRelative(review.createdAt, new Date())}
                            </p>
                        </div>
                        <p className="mt-2 line-clamp-3">{review.text}</p>
                    </div>
                );
            })}
        </div>
    );
};

type ReviewCardProps = {};

function ReviewCard({ }: ReviewCardProps) { }
