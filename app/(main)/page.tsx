import { Hero } from "@/components/hero";
import { Cities } from "@/components/cities";
import { PopularBrands } from "@/features/restaurants/components/popular-brands";

export default function MainPage() {
    return (
        <main>
            <Hero />
            <PopularBrands className="mb-20" />
            <Cities />
        </main>
    );
}
