"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Loader2Icon, SendIcon, StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useRestaurantReviewsModal } from "@/features/restaurants/hooks/use-restaurant-reviews-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { usePostReview } from "@/features/reviews/api/use-post-review";

const formSchema = z.object({
    text: z
        .string()
        .min(5, { message: "Review must be at least 5 characters long" })
        .max(200, { message: "Review should not exceed 200 characters" }),
    score: z
        .number()
        .min(1, { message: "Please select a score" })
        .max(5, { message: "Please select a score" }),
});
type FormValues = z.input<typeof formSchema>;

export const ReviewForm = () => {
    const mounted = useMounted();
    const postReview = usePostReview();
    const { restaurantId } = useRestaurantReviewsModal();
    const [isMouseIn, setIsMouseIn] = useState<boolean>(false);
    const [starAmount, setStarAmount] = useState<number>(0);
    const [finalStarAmount, setFinalStarAmount] = useState<number>(0);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            score: 0,
            text: "",
        },
    });

    useEffect(() => {
        form.setValue("score", finalStarAmount);
    }, [finalStarAmount]);

    function onSubmit(values: FormValues) {
        if (!restaurantId) {
            return;
        }
        postReview.mutate(
            {
                restaurantId,
                text: values.text,
                score: values.score,
            },
            {
                onSuccess: () => {
                    setFinalStarAmount(0);
                    setStarAmount(0);
                    form.reset();
                },
            }
        );
    }

    if (!mounted) {
        return null;
    }

    return (
        <div className="">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                >
                    <FormField
                        control={form.control}
                        name="score"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Review Score</FormLabel>
                                <FormControl>
                                    <div>
                                        <Input
                                            type="number"
                                            {...field}
                                            className="hidden"
                                        />
                                        <div
                                            className="flex w-[200px]"
                                            onClick={() =>
                                                setFinalStarAmount(starAmount)
                                            }
                                            onMouseEnter={() =>
                                                setIsMouseIn(true)
                                            }
                                            onMouseLeave={() => {
                                                setIsMouseIn(false);
                                                setStarAmount(0);
                                            }}
                                        >
                                            {new Array(5)
                                                .fill(null)
                                                .map((_, index) => {
                                                    let filled: boolean = false;
                                                    if (isMouseIn) {
                                                        if (starAmount !== 0) {
                                                            filled =
                                                                index + 1 <=
                                                                starAmount;
                                                        }
                                                    } else {
                                                        filled =
                                                            index + 1 <=
                                                            finalStarAmount;
                                                    }
                                                    return (
                                                        <div
                                                            className="size-10 cursor-pointer"
                                                            key={index}
                                                            onMouseEnter={() =>
                                                                setStarAmount(
                                                                    index + 1
                                                                )
                                                            }
                                                        >
                                                            <StarIcon
                                                                className={cn(
                                                                    "size-10 text-primary",
                                                                    filled &&
                                                                    "fill-primary"
                                                                )}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Review</FormLabel>
                                <FormControl>
                                    <Textarea
                                        rows={4}
                                        className="placeholder:italic"
                                        placeholder="Write your review..."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={postReview.isPending}
                    >
                        {postReview.isPending ? (
                            <Loader2Icon className="size-4 mr-2 animate-spin" />
                        ) : (
                            <SendIcon className="size-4 mr-2" />
                        )}
                        Send
                    </Button>
                </form>
            </Form>
        </div>
    );
};
