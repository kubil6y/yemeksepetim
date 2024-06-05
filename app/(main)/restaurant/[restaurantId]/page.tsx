import { RestaurantDetails } from "@/features/restaurants/components/restaurant-details";
import { RestaurantFoodLister } from "@/features/restaurants/components/restaurant-food-lister";

export default function RestaurantDetailPage({
    params,
}: {
    params: { restaurantId: string };
}) {
    return (
        <div className="container py-16">
            <RestaurantDetails restaurantId={params.restaurantId}/>
            <RestaurantFoodLister restaurantId={params.restaurantId} />
        </div>
    );
}
