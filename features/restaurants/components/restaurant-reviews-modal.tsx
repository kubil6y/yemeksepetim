"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMounted } from "@/hooks/use-mounted";
import { useRestaurantReviewsModal } from "../hooks/use-restaurant-reviews-modal";

export function RestaurantReviewsModal() {
    const mounted = useMounted();
    const { isOpen, close, restaurantId } = useRestaurantReviewsModal();
    if (!mounted) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent>
                {restaurantId}
            </DialogContent>
        </Dialog>
    );
}
