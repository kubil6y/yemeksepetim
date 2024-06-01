import {
    FilterDesktop,
    FilterModalButton,
} from "@/features/restaurants/components/filters";
import { Input } from "@/components/ui/input";
import { MainFoodLister } from "@/features/restaurants/components/main-food-lister";

export default function RestaurantsPage() {
    return (
        <div className="container">
            <div className="flex w-full gap-10">
                <FilterDesktop />

                <div className="w-full pt-24 lg:pt-32 pb-16">
                    <div className="flex items-center gap-2">
                        <Input
                            className="h-12 w-full rounded-full bg-accent px-4 focus:bg-white sm:h-16 sm:px-6"
                            placeholder="TODO: Search Input"
                        />

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
