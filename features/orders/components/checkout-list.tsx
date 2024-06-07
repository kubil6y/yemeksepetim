"use client";

import {
    useBasket,
    useBasketItemCount,
    useBasketTotal,
} from "@/features/basket/hooks/use-basket";
import {
    CookingPotIcon,
    Loader2Icon,
    SendIcon,
    ShoppingBagIcon,
    TrashIcon,
} from "lucide-react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { cn, formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BasketItemCard } from "@/features/basket/components/basket-item-card";
import { useConfirm } from "@/hooks/use-confirm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useCreateOrder } from "../api/use-create-order";

const formSchema = z.object({
    address: z
        .string()
        .min(10, { message: "Address must be at least 10 chars." })
        .max(200, { message: "Address can not exceed 200 chars." }),
});

type FormValues = z.input<typeof formSchema>;

type CheckoutItemLisProps = {
    className?: string;
};

export const CheckoutItemList = ({ className }: CheckoutItemLisProps) => {
    const [ClearConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to clear your basket."
    );

    const basket = useBasket();
    const basketItemCount = useBasketItemCount();
    const basketTotal = useBasketTotal();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: { address: "" },
    });

    const createOrder = useCreateOrder();

    function onSubmit({ address }: FormValues) {
        if (basketItemCount === 0) {
            return;
        }
        const items = basket.items.map((x) => {
            return {
                foodId: x.item.id,
                amount: x.amount,
            };
        });
        createOrder.mutate({ address, items });
    }

    async function handleClearAll() {
        const ok = await confirm();
        if (ok) {
            basket.clearAll();
        }
    }

    if (basketItemCount === 0) {
        return <EmptyCheckout />;
    }

    return (
        <>
            <ClearConfirmDialog />
            <div className="flex justify-between">

                <div className="flex items-start gap-2">
                    <h1 className="text-3xl sm:text-5xl">Checkout</h1>
                    <Button variant="ghost" onClick={handleClearAll} className="text-primary hover:text-primary">
                        <TrashIcon className="size-4 mr-2" />
                        Clear all
                    </Button>
                </div>

                    <div className="text-end text-lg md:text-5xl">
                        Total {formatCurrency(basketTotal)}
                    </div>

            </div>

            <div className={cn("space-y-6 pb-24", className)}>
                <div className="space-y-3">
                    {basket.items.map((basketItem) => (
                        <BasketItemCard
                            key={basketItem.id}
                            basketItem={basketItem}
                            isFullscreen
                        />
                    ))}
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="">
                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-lg">
                                        Address
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={4}
                                            className="w-3/4 placeholder:italic"
                                            placeholder="Ex. The Pentagon 1400 Defense Pentagon Washington, DC 20301-1400 USA"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your full address
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button
                            className="mt-2 text-lg"
                            type="submit"
                            size="lg"
                            disabled={createOrder.isPending}
                        >
                            Order
                            {createOrder.isPending ? (
                                <Loader2Icon className="size-6 ml-2 animate-spin" />
                            ) : (
                                <SendIcon className="size-6 ml-2" />
                            )}
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
};

function EmptyCheckout() {
    return (
        <div className="mt-12 flex w-full items-center justify-center bg-white p-5">
            <div className="space-y-5 text-center">
                <div className="inline-flex rounded-full bg-red-100 p-4">
                    <div className="rounded-full bg-red-200 stroke-red-600 p-4">
                        <ShoppingBagIcon className="text-red-500" />
                    </div>
                </div>
                <div className="text-muted-foreground lg:text-lg">
                    <p>Your shopping cart is empty.</p>
                    <p>Browse our products and add some items!</p>
                </div>

                <Button
                    className="flex w-full items-center text-lg"
                    onClick={() => { }}
                    asChild
                >
                    <Link href="/restaurants">
                        <CookingPotIcon className="size-5 mr-2 text-primary-foreground" />
                        Discover
                    </Link>
                </Button>
            </div>
        </div>
    );
}
