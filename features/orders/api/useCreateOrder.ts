import { toast } from "sonner";
import { client } from "@/lib/hono";
import { useRouter } from "next/navigation";
import { useBasket } from "@/features/basket/hooks/use-basket";
import { useBasketSheet } from "@/features/basket/hooks/use-basket-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof client.api.orders.$post>;
type RequestType = InferRequestType<typeof client.api.orders.$post>["json"];

export const useCreateOrder = () => {
    const router = useRouter();
    const basket = useBasket();
    const basketSheet = useBasketSheet();
    const queryClient = useQueryClient();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            const response = await client.api.orders.$post({ json });
            const data = await response.json();
            return data;
        },
        onSuccess: () => {
            router.push("/orders");
            if (basketSheet.isOpen) {
                basketSheet.close();
            }
            basket.clearAll();
            toast.success("Order created");
            queryClient.invalidateQueries({
                queryKey: ["orders"],
            });
        },
        onError: () => {
            toast.error("Failed to create order");
        }
    });
    return mutation;
};
