import { FilterModal } from "@/features/restaurants/components/filter-modal"
import { RestaurantReviewsModal } from "@/features/restaurants/components/restaurant-reviews-modal"

export const ModalProvider = () => {
    return ( 
        <>
            <FilterModal />
            <RestaurantReviewsModal />
        </>
    )
}
