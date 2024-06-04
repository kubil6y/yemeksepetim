"use client";

import { useGetRestaurant } from "../api/use-get-restaurant";

type RestaurantDetailsProps = {
    restaurantId?: string;
};

// TODO
export const RestaurantDetails = ({ restaurantId }: RestaurantDetailsProps) => {
    const restaurantQuery = useGetRestaurant(restaurantId);
    if (restaurantQuery.isLoading) {
        return <div>Loading...</div>
    }
    return <div className="">{restaurantQuery.data?.data.restaurant.name}</div>;
};
