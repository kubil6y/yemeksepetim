import { cn } from "@/lib/utils";
import { CategoriesCarousel } from "./categories-carousel";

type CategoriesProps = {
    className?: string;
};

export const Categories = ({ className }: CategoriesProps) => {
    return (
        <div className={cn("container", className)}>
            <h2 className="text-2xl font-semibold -ml-4">Popular Categories</h2>
            <CategoriesCarousel />
        </div>
    );
};
