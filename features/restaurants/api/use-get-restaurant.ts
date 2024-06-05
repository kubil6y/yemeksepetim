import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGetRestaurant = (id?: string) => {
    const router = useRouter();
    const query = useQuery({
        enabled: Boolean(id),
        queryKey: ["restaurant", { id }],
        queryFn: async () => {
            const response = await client.api.restaurant[":id"].$get({
                param: { id },
            });
            if (!response.ok) {
                if (response.status === 404) {
                    toast.error("Restaurant not found!");
                    router.push("/restaurants");
                    throw new Error("Restaurant not found");
                }
                throw new Error("Failed to fetch restaurant");
            }
            const { data } = await response.json();
            return { data };
        },
    });
    return query;
};
