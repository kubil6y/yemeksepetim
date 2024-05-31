import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const useGetFoods = () => {
    const params = useSearchParams();
    const page = params.get("page") ?? "";
    const page_size = params.get("page_size") ?? "";
    const sorting = params.get("sorting") ?? "";
    const categories = params.get("categories") ?? "";
    const min_order_amount = params.get("min_order_amount") ?? "";

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
            const { data } = await response.json();
            return data;
        },
    });
    return query;
};
