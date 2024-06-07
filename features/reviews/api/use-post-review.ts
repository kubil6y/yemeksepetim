import { useRestaurantReviewsModal } from "@/features/restaurants/hooks/use-restaurant-reviews-modal";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
    (typeof client.api.reviews)[":id"]["$post"]
>;
type RequestType = InferRequestType<
    (typeof client.api.reviews)[":id"]["$post"]
>["json"];

export const usePostReview = () => {
    const queryClient = useQueryClient();
    const { restaurantId } = useRestaurantReviewsModal();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.reviews[":id"].$post({
                param: { id: restaurantId },
                json: json,
            });
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["restaurant", { id: restaurantId }],
            });
            queryClient.invalidateQueries({
                queryKey: ["restaurant_review", { id: restaurantId }],
            });

            toast.success("Review created");
        },
        onError: () => {
            toast.error("Failed to create review");
        },
    });
    return mutation;
};
