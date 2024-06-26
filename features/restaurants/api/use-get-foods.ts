import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetFoods = () => {
    const params = useSearchParams();
    const page = params.get("page") ?? undefined;
    const page_size = params.get("page_size") ?? undefined;
    const sorting = params.get("sorting") ?? undefined;
    const categories = params.get("categories") ?? undefined;
    const min_order_amount = params.get("min_order_amount") ?? undefined;

    const query = useQuery({
        queryKey: [
            "restaurants",
            {
                page,
                sorting,
                page_size,
                min_order_amount,
                categories,
            },
        ],
        queryFn: async () => {
            const response = await client.api.restaurants.$get({
                query: {
                    page,
                    sorting,
                    page_size,
                    min_order_amount,
                    categories,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            const { metadata, data }  = await response.json();
            return { metadata, data };
        },
    });
    return query;
};
