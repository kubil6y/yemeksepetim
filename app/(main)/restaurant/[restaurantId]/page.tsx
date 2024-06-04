import { SearchInput } from "@/features/search/components/search-input";
import { RestaurantFoodLister } from "@/features/restaurants/components/restaurant-food-lister";

export default function RestaurantDetailPage({
    params,
}: {
    params: { restaurantId: string };
}) {
    return (
        <div className="container pt-16">
            <h1>RestaurantDetailPage {params.restaurantId}</h1>
            <SearchInput />
            <RestaurantFoodLister restaurantId={params.restaurantId} />
        </div>
    );
}
