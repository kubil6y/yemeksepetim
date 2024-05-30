"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const sortingOptions = [
    { id: 0, value: "suggested", label: "Suggested" },
    { id: 1, value: "restaurant_rating", label: "Restaurant rating" },
    { id: 2, value: "food_rating", label: "Food rating" },
];

const formSchema = z.object({
    sorting: z.enum(["suggested", "restaurant_rating", "food_rating"]),
});
type FormValues = z.input<typeof formSchema>;

export function Filters() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sorting: "suggested",
        },
    });

    function onSubmit(values: FormValues) {
        console.log(values);
    }

    function onClear() {
        form.reset();
    }

    return (
        <Card className="sticky left-0 top-[120px] hidden h-[640px] w-[320px] overflow-y-auto lg:block lg:shrink-0">
            <CardContent className="space-y-4 py-4">
                <div className="flex items-center justify-between">
                    <p className="text-2xl font-semibold">Filters</p>
                    <Button
                        variant="ghost"
                        className="text-primary hover:text-primary"
                        onClick={onClear}
                    >
                        Clear
                    </Button>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="sorting"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormLabel className="font-semibold">
                                        Sorting
                                    </FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                            value={field.value}
                                            className="flex flex-col space-y-2"
                                        >
                                            {sortingOptions.map((option) => (
                                                <FormItem
                                                    className="flex items-center space-y-0"
                                                    key={option.id}
                                                >
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            value={option.value}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="ml-2 font-normal cursor-pointer">
                                                        {option.label}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="mt-8">
                            Submit
                        </Button>
                    </form>
                </Form>

                {/* Sorting */}

                {/* Categories */}
                <div>categories options</div>

                {/* Price range */}
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
                <div>Price range</div>
            </CardContent>
        </Card>
    );
}
