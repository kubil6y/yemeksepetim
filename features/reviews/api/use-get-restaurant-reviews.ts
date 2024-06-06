import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetRestaurantReviews = (restaurantId?: string) => {
    const query = useQuery({
        enabled: Boolean(restaurantId),
        queryKey: ["restaurant", { restaurantId }],
        queryFn: async () => {
            const response = await client.api.reviews[":id"].$get({
                param: { id: restaurantId },
            });
            if (!response.ok) {
                throw new Error("failed to fetch restaurant review");
            }
            const { data } = await response.json();
            return { data };
        },
    });
    return query;
};
