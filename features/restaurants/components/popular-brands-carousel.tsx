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
import { useGetPopularBrands } from "../api/use-get-popular-brands";
import { UnavailableHint } from "@/components/unavailable-hint";

export const PopularBrandsCarousel = () => {
    const popularBrands = useGetPopularBrands();
    if (popularBrands.isLoading) {
        return (
            <div className="flex h-24 w-full items-center justify-center">
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
                <CarouselContent>
                    {popularBrands.data?.map((brand) => {
                        const imageUrl = "/assets/brands/" + brand.imageUrl;
                        const isUnavailable = brand.itemCount <= 0;
                        return (
                            <CarouselItem
                                key={brand.id}
                                className="py-2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                            >
                                <BrandCard
                                    key={brand.id}
                                    name={brand.name}
                                    imageUrl={imageUrl}
                                    isUnavailable={isUnavailable}
                                    href={`/restaurant/${brand.id}`}
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

type BrandCardProps = {
    name: string;
    imageUrl: string;
    href: string;
    isUnavailable?: boolean;
};

function BrandCard({ name, imageUrl, href, isUnavailable }: BrandCardProps) {
    return (
        <Link className="group flex h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg" href={href}>
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    width={120}
                    height={120}
                    alt={name}
                    className="w-full transition group-hover:scale-110"
                />
            </div>
            <div className="ml-2 flex w-full flex-col items-start justify-center space-y-1">
                <p className="text-sm font-semibold capitalize md:text-base">
                    {name}
                </p>
                {isUnavailable && <UnavailableHint />}
            </div>
        </Link>
    );
}
