"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";
import { useGetCategories } from "../api/use-get-categories";

export const CategoriesCarousel = () => {
    const categories = useGetCategories();
    if (categories.isLoading) {
        return (
            <div
                className="flex w-full items-center justify-center"
                style={{ height: 90 }}
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
                        const imageUrl =
                            "/assets/categories/" + category.imageUrl;
                        return (
                            <CarouselItem
                                key={category.id}
                                className="basis-1/4"
                            >
                                <CategoryCard
                                    key={category.id}
                                    name={category.name}
                                    imageUrl={imageUrl}
                                    href={`/restaurants/${category.id}`}
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
};

function CategoryCard({ name, href, imageUrl }: CategoryCardProps) {
    return (
        <Link className="flex h-full w-full flex-col gap-4" href={href}>
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    width={120}
                    height={120}
                    alt={name}
                    className="w-full"
                />
            </div>
            <p className="text-sm font-semibold capitalize md:text-base text-center">
                {name}
            </p>
        </Link>
    );
}
