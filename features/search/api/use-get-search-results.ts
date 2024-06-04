import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetSearchResults = (term: string) => {
    const query = useQuery({
        enabled: Boolean(term),
        queryKey: ["restaurants", { term }],
        queryFn: async () => {
            const response = await client.api.search.$get({
                query: { term },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            const { data } = await response.json();
            return { data };
        },
    });
    return query;
};
