import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetPopularBrands = () => {
    const query = useQuery({
        queryKey: ["popular_brands"],
        queryFn: async () => {
            const response = await client.api.restaurants.popular.$get();
            if (!response.ok) {
                throw new Error("Failed to fetch restaurants");
            }
            const { data } = await response.json();
            return data;
        },
    });
    return query;
};
