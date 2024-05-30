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
                <CarouselContent>
                    {popularBrands.data?.map((brand) => {
                        const imageUrl = "/assets/brands/" + brand.imageUrl;
                        const isUnavailable = brand.itemCount <= 0;
                        return (
                            <CarouselItem key={brand.id} className="basis-1/5">
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
        <Link className="flex" href={href}>
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    width={120}
                    height={120}
                    alt={name}
                    className="w-full"
                />
            </div>
            <div className="ml-2 flex w-full flex-col items-start justify-center">
                <p className="text-sm font-semibold capitalize md:text-base">
                    {name}
                </p>
                {isUnavailable && <UnavailableHint className="mt-4" />}
            </div>
        </Link>
    );
}
