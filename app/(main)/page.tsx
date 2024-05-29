import { Hero } from "@/components/hero";
import { Cities } from "@/components/cities";
import { PopularBrands } from "@/features/restaurants/components/popular-brands";
import { Categories } from "@/features/categories/components/categories";

export default function MainPage() {
    return (
        <main className="space-y-20">
            <Hero />
            <PopularBrands />
            <Categories />
            <Cities />
        </main>
    );
}
