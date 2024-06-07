"use client";

import {
    ChefHatIcon,
    HeartIcon,
    Loader2Icon,
    LoaderIcon,
    ServerCrashIcon,
    StarIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatRelative } from "date-fns";
import { useGetRestaurantReviews } from "@/features/reviews/api/use-get-restaurant-reviews";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useClerk } from "@clerk/clerk-react";
import { useRestaurantReviewsModal } from "../hooks/use-restaurant-reviews-modal";
import { usePostReviewRating } from "../api/use-post-review-rating";

type RestauantReviewsListProps = {
    restaurantId?: string;
};

export const RestauantReviewsList = ({
    restaurantId,
}: RestauantReviewsListProps) => {
    const { user } = useUser();
    const reviewsQuery = useGetRestaurantReviews(restaurantId);

    if (reviewsQuery.isLoading) {
        return (
            <div className="flex h-12 w-full items-center justify-center">
                <Loader2Icon className="loading-icon" />
            </div>
        );
    }
    if (reviewsQuery.isError) {
        return (
            <div className="flex h-12 w-full items-center justify-center">
                <ServerCrashIcon className="size-4 mr" /> No reviews
            </div>
        );
    }
    if (reviewsQuery.data?.data.length === 0) {
        return (
            <div className="flex h-12 w-full items-center justify-center">
                <ChefHatIcon className="size-4 mr" /> No reviews
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {reviewsQuery.data?.data.map((review) => {
                const existingRatingIndex = review.ratings.findIndex((r) => {
                    return r.userId === user?.id;
                });
                const hasLiked = existingRatingIndex !== -1;
                let ratingId: string | undefined = undefined;
                if (existingRatingIndex !== -1) {
                    ratingId = review.ratings[existingRatingIndex].id
                }

                return (
                    <ReviewCard
                        key={review.id}
                        reviewId={review.id}
                        restaurantId={review.restaurantId}
                        hasLiked={hasLiked}
                        username={review.username}
                        score={review.score}
                        text={review.text}
                        ratingAmount={review.ratings.length}
                        ratingId={ratingId}
                        createdAt={review.createdAt}
                    />
                );
            })}
        </div>
    );
};

type ReviewCardProps = {
    reviewId: string;
    hasLiked: boolean;
    username: string;
    score: number;
    text: string;
    ratingAmount: number;
    restaurantId: string;
    ratingId?: string;
    createdAt: string;
};

function ReviewCard({
    reviewId,
    hasLiked,
    username,
    score,
    text,
    ratingAmount,
    restaurantId,
    ratingId,
    createdAt,
}: ReviewCardProps) {
    const { user } = useUser();
    const { openSignIn } = useClerk();
    const reviewsModal = useRestaurantReviewsModal();
    const rateReview = usePostReviewRating(restaurantId, reviewId);

    function handleRateReview() {
        if (!user) {
            reviewsModal.close();
            openSignIn({
                fallbackRedirectUrl: `/restaurant/${restaurantId}`
            });
            return;
        }
        rateReview.mutate({
            action: hasLiked ? "dislike" : "like",
            ratingId, 
        });
    }
    return (
        <div className="rounded-lg bg-rose-50 p-2 shadow">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{username}</p>
                    {score > 0 && (
                        <div className="flex items-center gap-0.5">
                            {new Array(5).fill(null).map((_, index) => {
                                let filled = index + 1 <= score;
                                return (
                                    <StarIcon
                                        key={`${reviewId}_${index}`}
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

                <p className="text-sm text-muted-foreground">
                    {formatRelative(createdAt, new Date())}
                </p>
            </div>
            <p className="mt-2 line-clamp-3">{text}</p>

            <Button
                variant="outline"
                disabled={rateReview.isPending}
                className="group mt-2 bg-rose-50 text-sm"
                onClick={handleRateReview}
            >
                {rateReview.isPending ? (
                    <LoaderIcon className="size-4 mr-2 animate-spin text-primary" />
                ) : (
                    <HeartIcon
                        className={cn(
                            "size-4 mr-2 text-primary",
                            hasLiked && "fill-primary group-hover:fill-none",
                            !hasLiked &&
                            "fill-none transition group-hover:fill-primary"
                        )}
                    />
                )}
                <span>{ratingAmount}</span>
            </Button>
        </div>
    );
}
