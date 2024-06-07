import { Hero } from "@/components/hero";
import { Cities } from "@/components/cities";
import { PopularBrands } from "@/features/restaurants/components/popular-brands";
import { PopularCategories } from "@/features/categories/components/popular-categories";

export default function MainPage() {
    return (
        <main className="space-y-12">
            <Hero />
            <PopularBrands />
            <PopularCategories />
            <Cities />
        </main>
    );
}
