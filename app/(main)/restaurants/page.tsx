import {
    FilterDesktop,
    FilterModalButton,
} from "@/features/restaurants/components/filters";
import { MainFoodLister } from "@/features/restaurants/components/main-food-lister";
import { SearchInput } from "@/features/search/components/search-input";

export default function RestaurantsPage() {
    return (
        <div className="container">
            <div className="flex w-full gap-10">
                <FilterDesktop />

                <div className="w-full pt-24 lg:pt-32 pb-16">
                    <div className="flex items-center gap-2">
                        <SearchInput />

                        <div className="block lg:hidden">
                            <FilterModalButton />
                        </div>
                    </div>

                    <MainFoodLister />
                </div>
            </div>
        </div>
    );
}
