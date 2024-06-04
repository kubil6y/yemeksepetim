"use client";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { useRestaurantCommentsModal } from "../hooks/use-restaurant-comments-modal";

// TODO
export function RestaurantCommentsModal() {
    const { isOpen, close, restaurantId} = useRestaurantCommentsModal();
    return (
        <Dialog open={isOpen} onOpenChange={close} >
            <DialogContent className="sm:max-w-[425px] mx-auto">
                <p>RestaurantCommentsModal</p>
                <p>{restaurantId}</p>
            </DialogContent>
        </Dialog>
    );
}

