import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
    (typeof client.api.reviews.like)[":reviewId"]["$post"]
>;
type RequestType = InferRequestType<
    (typeof client.api.reviews.like)[":reviewId"]["$post"]
>["json"];

export const usePostReviewRating = (
    restaurantId?: string,
    reviewId?: string
) => {
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.reviews.like[":reviewId"].$post({
                param: { reviewId },
                json,
            });
            if (!response.ok) {
                throw new Error("Failed to rate review!");
            }
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["restaurant_review", { id: restaurantId }],
            });
        },
    });
    return mutation;
};
