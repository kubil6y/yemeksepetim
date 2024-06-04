import { FilterModal } from "@/features/restaurants/components/filter-modal"
import { RestaurantCommentsModal } from "@/features/restaurants/components/restaurant-comments-modal"

export const ModalProvider = () => {
    return ( 
        <>
            <FilterModal />
            <RestaurantCommentsModal />
        </>
    )
}
