import { RestaurantFoodLister } from "@/features/restaurants/components/restaurant-food-lister";
import { SearchInput } from "@/features/search/components/search-input";

export default function RestaurantDetailPage({
    params,
}: {
    params: { restaurantId: string };
}) {
    //<RestaurantFoodLister restaurantId={params.restaurantId}/>
    return (
        <div className="pt-16 container">
            <h1>RestaurantDetailPage {params.restaurantId}</h1>
            <SearchInput />
        </div>
    );
}
