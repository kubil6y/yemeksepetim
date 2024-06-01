import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetRestaurant = (id?: string) => {
    const query = useQuery({
        queryKey: ["restaurant", { id }],
        queryFn: async () => {
            const response = await client.api.restaurant[":id"].$get({
                param: { id },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch account");
            }
            const { data } = await response.json();
            return data;
        },
    });
    return query;
};
