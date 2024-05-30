"use client";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { ChevronDownIcon, Loader2Icon, SearchIcon, XIcon } from "lucide-react";
import { categories } from "@/db/schema";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/utils";

const MIN_CATEGORIES_AMOUNT = 5;
const MAX_SEARCH_INPUT_LENGTH = 10;

const sortingOptions = [
    { id: 0, value: "suggested", label: "Suggested" },
    { id: 1, value: "restaurant_rating", label: "Restaurant rating" },
    { id: 2, value: "food_rating", label: "Food rating" },
];

const formSchema = z.object({
    sorting: z.enum(["suggested", "restaurant_rating", "food_rating"]),
    items: z.array(z.string()),
    minOrderAmount: z.number(),
});
type FormValues = z.input<typeof formSchema>;

export function Filters() {
    const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
    const [categorySearchInput, setCategorySearchInput] = useState<string>("");
    const [categoryOptions, setCategoryOptions] = useState<
        (typeof categories.$inferSelect)[]
    >([]);
    const categoriesQuery = useGetCategories();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            sorting: "suggested",
            items: [],
            minOrderAmount: 50,
        },
    });

    function onSubmit(values: FormValues) {
        console.log(values);
    }

    function onClear() {
        setCategorySearchInput("");
        form.reset();
    }

    // Resolve category options
    useEffect(() => {
        if (!categoriesQuery.data) {
            setCategoryOptions([]);
            setShowAllCategories(false);
            return;
        }

        let categoryOptions: (typeof categories.$inferSelect)[] = [];
        if (categorySearchInput) {
            for (const option of categoriesQuery.data) {
                if (option.name.toLowerCase().includes(categorySearchInput)) {
                    categoryOptions.push(option);
                }
            }
        } else {
            if (showAllCategories) {
                categoryOptions = categoriesQuery.data;
            } else {
                categoryOptions = categoriesQuery.data.slice(0, 5);
            }
        }
        setCategoryOptions(categoryOptions);
    }, [categorySearchInput, categoriesQuery.data, showAllCategories]);

    // After a search selected category options can be hidden
    // If "Show more" is not clicked. Handle show more
    useEffect(() => {
        if (!categoriesQuery.data || showAllCategories) {
            return;
        }
        let minIndex = 0;
        for (const selectedOptionId of form.getValues("items")) {
            for (let i = 0; i < categoriesQuery.data.length; i++) {
                const item = categoriesQuery.data[i];
                if (selectedOptionId === item.id && minIndex < i) {
                    minIndex = i;
                }
            }
        }
        if (minIndex >= MIN_CATEGORIES_AMOUNT) {
            setShowAllCategories(true);
        }
    }, [categorySearchInput]);

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
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="sorting"
                            render={({ field }) => (
                                <FormItem className="space-y-4">
                                    <FormLabel className="text-base">
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
                                                    <FormLabel className="ml-2 cursor-pointer font-normal">
                                                        {option.label}
                                                    </FormLabel>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="items"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">
                                            Categories
                                        </FormLabel>
                                    </div>

                                    {categoriesQuery.isLoading && (
                                        <div className="flex h-40 w-full items-center justify-center bg-rose-500">
                                            <Loader2Icon className="loading-icon mr-8" />
                                        </div>
                                    )}

                                    {!categoriesQuery.isLoading && (
                                        <Input
                                            type="text"
                                            value={categorySearchInput}
                                            className="h-full w-full pl-8"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                setCategorySearchInput(
                                                    e.target.value
                                                );
                                            }}
                                            startIcon={SearchIcon}
                                            endIcon={
                                                categorySearchInput.length > 0
                                                    ? XIcon
                                                    : undefined
                                            }
                                            endIconOnClick={() =>
                                                setCategorySearchInput("")
                                            }
                                            placeholder="Search category..."
                                        />
                                    )}

                                    <div className="space-y-4 pt-4">
                                        {categoryOptions.map((item) => (
                                            <FormField
                                                key={item.id}
                                                control={form.control}
                                                name="items"
                                                render={({ field }) => {
                                                    return (
                                                        <FormItem
                                                            key={item.id}
                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                        >
                                                            <FormControl>
                                                                <Checkbox
                                                                    checked={field.value?.includes(
                                                                        item.id
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked
                                                                    ) => {
                                                                        return checked
                                                                            ? field.onChange(
                                                                                [
                                                                                    ...field.value,
                                                                                    item.id,
                                                                                ]
                                                                            )
                                                                            : field.onChange(
                                                                                field.value?.filter(
                                                                                    (
                                                                                        value
                                                                                    ) =>
                                                                                        value !==
                                                                                        item.id
                                                                                )
                                                                            );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="ml-2 cursor-pointer font-normal">
                                                                {item.name}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        ))}

                                        {categorySearchInput &&
                                            categoryOptions.length === 0 && (
                                                <div className="flex flex-col items-center justify-center">
                                                    <p className="word-break font-semibold">
                                                        No results found for "
                                                        {categorySearchInput.length >
                                                            MAX_SEARCH_INPUT_LENGTH
                                                            ? categorySearchInput.slice(
                                                                0,
                                                                MAX_SEARCH_INPUT_LENGTH
                                                            ) + "..."
                                                            : categorySearchInput}
                                                        "
                                                    </p>
                                                    <p className="text-sm">
                                                        Please try again
                                                    </p>
                                                </div>
                                            )}

                                        {!showAllCategories &&
                                            !categorySearchInput &&
                                            !categoriesQuery.isLoading && (
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="text-primary hover:text-primary"
                                                    onClick={() =>
                                                        setShowAllCategories(
                                                            true
                                                        )
                                                    }
                                                >
                                                    Show more
                                                    <ChevronDownIcon className="size-4 ml-2 text-primary" />
                                                </Button>
                                            )}
                                    </div>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="minOrderAmount"
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel className="flex items-center justify-start gap-2 mb-4 text-sm">
                                        Minimum Order Amount{" "}
                                        <span className="text-lg text-primary">
                                            {formatCurrency(value)}
                                        </span>
                                    </FormLabel>
                                    <FormControl>
                                        <Slider
                                            min={0}
                                            max={300}
                                            step={30}
                                            defaultValue={[value]}
                                            onValueChange={(vals) => {
                                                onChange(vals[0]);
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full">
                            Apply
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
