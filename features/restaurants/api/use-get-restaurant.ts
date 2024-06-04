import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams, useRouter } from "next/navigation";

export const useGetRestaurant = (id?: string) => {
    const params = useSearchParams();
    const router = useRouter();
    const page = params.get("page") ?? undefined;
    const page_size = params.get("page_size") ?? undefined;

    const query = useQuery({
        enabled: Boolean(id),
        queryKey: ["restaurant", { id, page, page_size }],
        queryFn: async () => {
            const response = await client.api.restaurant[":id"].$get({
                param: { id },
                query: { page, page_size },
            });
            if (!response.ok) {
                if (response.status === 404) {
                    toast.error("Restaurant not found!", {
                        position: "top-center",
                    });
                    router.push("/restaurants");
                    throw new Error("Restaurant not found");
                }
                throw new Error("Failed to fetch restaurant");
            }
            const { metadata, data } = await response.json();
            return { metadata, data };
        },
    });
    return query;
};
