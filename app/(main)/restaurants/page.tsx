import { Input } from "@/components/ui/input";
import {
    FilterDesktop,
    FilterModalButton,
} from "@/features/restaurants/components/filters";

export default function RestaurantsPage() {
    return (
        <div className="container">
            <div className="relative flex w-full gap-10">
                <FilterDesktop />

                <div className="w-full pt-24 lg:pt-32">
                    <div className="flex items-center gap-2">
                        <Input
                            className="h-16 w-full rounded-full bg-accent px-6 focus:bg-white"
                            placeholder="TODO: Search Input"
                        />

                        <div className="block lg:hidden">
                            <FilterModalButton />
                        </div>
                    </div>

                    <div className="min-h-[80vh] w-full space-y-[50px]">
                        <p>lkasjd</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
