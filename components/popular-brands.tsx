import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { popularBrands } from "@/data/popular-brands";
import Link from "next/link";

export const PopularBrands = () => {
    // TODO get this from database
    // add skeleton for loading...
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Popular Brands</h1>

            <div className="container">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className=""
                >
                    <CarouselContent>
                        {popularBrands.map((brand, index) => {
                            const imageUrl = "/assets/brands/" + brand.imageSrc;
                            return (
                                <CarouselItem
                                    key={index}
                                    className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5"
                                >
                                    <BrandCard
                                        key={brand.id}
                                        name={brand.name}
                                        imageUrl={imageUrl}
                                        href="/restaurants/some_id"
                                    />
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
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
        <Link className="group flex h-full w-full"  href={href}>
            <div className="overflow-hidden rounded-lg">
                <Image
                    src={imageUrl}
                    width={160}
                    height={160}
                    alt={name}
                    className="w-full duration-500 group-hover:scale-110"
                />

            </div>
            <div className="flex w-full items-center justify-start pl-2">
                <h3 className="font-semibold capitalize">{name}</h3>
            </div>
        </Link>
    );
}
