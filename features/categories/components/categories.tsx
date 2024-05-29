import { cn } from "@/lib/utils";
import { CategoriesCarousel } from "./categories-carousel";

type CategoriesProps = {
    className?: string;
};

export const Categories = ({ className }: CategoriesProps) => {
    return (
        <div className={cn("space-y-4 container", className)}>
            <h2 className="text-2xl font-semibold -ml-4">Popular Brands</h2>
            <CategoriesCarousel />
        </div>
    );
};
