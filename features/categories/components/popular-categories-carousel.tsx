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
                            <CarouselItem key={category.id} className="xs:basis-1/2 sm:basis-1/3 md:basis-1/6">
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
        <Link className="group flex h-full w-full flex-col space-y-2" href={href}>
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    width={120}
                    height={120}
                    alt={name}
                    className="w-full transition group-hover:scale-110"
                />
            </div>
            <div className="flex w-full flex-col items-center gap-1">
                <p className="text-center text-sm font-semibold capitalize md:text-base">
                    {name}
                </p>
                {isUnavailable && <UnavailableHint />}
            </div>
        </Link>
    );
}
