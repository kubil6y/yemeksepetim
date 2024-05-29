import { cn } from "@/lib/utils";
import { PopularBrandsCarousel } from "./popular-brands-carousel";

type PopularBrandsProps = {
    className?: string;
};

export const PopularBrands = ({ className }: PopularBrandsProps) => {
    return (
        <div className={cn("space-y-4 container", className)}>
            <h2 className="text-2xl font-semibold -ml-4">Popular Brands</h2>
            <PopularBrandsCarousel />
        </div>
    );
};
