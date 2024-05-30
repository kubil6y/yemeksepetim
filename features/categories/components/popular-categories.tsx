import { cn } from "@/lib/utils";
import { PopularCategoriesCarousel } from "./popular-categories-carousel";

type PopularCategoriesProps = {
    className?: string;
};

export const PopularCategories = ({ className }: PopularCategoriesProps) => {
    return (
        <div className={cn("container", className)}>
            <h2 className="text-2xl font-semibold -ml-4">Popular Categories</h2>
            <PopularCategoriesCarousel />
        </div>
    );
};
