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

export const PopularBrandsCarousel = () => {
    const popularBrands = useGetPopularBrands();
    if (popularBrands.isLoading) {
        return (
            <div
                className="w-full flex items-center justify-center"
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
                        return (
                            <CarouselItem key={brand.id} className="basis-1/5">
                                <BrandCard
                                    key={brand.id}
                                    name={brand.name}
                                    imageUrl={imageUrl}
                                    href={`/restaurants/${brand.id}`}
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
};

function BrandCard({ name, imageUrl, href }: BrandCardProps) {
    return (
        <Link className="flex h-full w-full" href={href}>
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    width={120}
                    height={120}
                    alt={name}
                    className="w-full"
                />
            </div>
            <div className="ml-2 flex w-full items-center justify-start">
                <p className="capitalize font-semibold">{name}</p>
            </div>
        </Link>
    );
}
