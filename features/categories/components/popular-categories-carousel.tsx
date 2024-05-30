"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import qs from "query-string";
import Image from "next/image";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { useGetCategories } from "../api/use-get-categories";
import { UnavailableHint } from "@/components/unavailable-hint";

export const PopularCategoriesCarousel = () => {
    const categories = useGetCategories();
    if (categories.isLoading) {
        return (
            <div
                className="flex w-full items-center justify-center"
                style={{ height: 120 }}
            >
                <Loader2Icon className="loading-icon" />
            </div>
        );
    }

    return (
        <div className="container">
            <Carousel
                opts={{
                    align: "start",
                }}
                className=""
            >
                <CarouselContent className="gap-8">
                    {categories.data?.map((category) => {
                        const isUnavailable = category.itemCount <= 0;
                        const imageUrl =
                            "/assets/categories/" + category.imageUrl;
                        const query = {
                            categories: encodeURIComponent(category.id),
                        }
                        const url = qs.stringifyUrl({
                            url: "/restaurants",
                            query,
                        }, { skipEmptyString: true, skipNull: true});
                        return (
                            <CarouselItem key={category.id} className="basis-2">
                                <CategoryCard
                                    key={category.id}
                                    name={category.name}
                                    imageUrl={imageUrl}
                                    isUnavailable={isUnavailable}
                                    href={url}
                                />
                            </CarouselItem>
                        );
                    })}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

type CategoryCardProps = {
    name: string;
    href: string;
    imageUrl: string;
    isUnavailable?: boolean;
};

function CategoryCard({
    name,
    href,
    imageUrl,
    isUnavailable,
}: CategoryCardProps) {
    return (
        <Link className="flex h-full w-full flex-col gap-4" href={href}>
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    width={120}
                    height={120}
                    alt={name}
                    className="w-full transition hover:scale-110"
                />
            </div>
            <div className="flex flex-col gap-1 items-center w-full">
                <p className="text-sm font-semibold capitalize md:text-base text-center">
                    {name}
                </p>
                {isUnavailable && <UnavailableHint className="" />}
            </div>
        </Link>
    );
}
