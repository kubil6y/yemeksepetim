export default function RestaurantDetailPage({
    params,
}: {
    params: { restaurantId: string };
}) {
    return (
        <div className="pt-16 container">
            <h1>RestaurantDetailPage {params.restaurantId}</h1>
        </div>
    );
}
