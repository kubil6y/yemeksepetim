"use client";

import { ClerkLoading, ClerkLoaded, SignedIn } from "@clerk/nextjs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMounted } from "@/hooks/use-mounted";
import { useRestaurantReviewsModal } from "../hooks/use-restaurant-reviews-modal";
import { ReviewForm } from "./review-form";
import { Loader2Icon } from "lucide-react";

export function RestaurantReviewsModal() {
    const mounted = useMounted();
    const { isOpen, close, restaurantId } = useRestaurantReviewsModal();
    if (!mounted) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="flex-col">
                <ClerkLoaded>
                    <SignedIn>
                        <ReviewForm />
                    </SignedIn>
                </ClerkLoaded>
                <p>lasdkjf</p>
                <p>lasdkjf</p>
                <p>lasdkjf</p>
                <p>lasdkjf</p>
                <p>lasdkjf</p>
                <p>lasdkjf</p>
                <p>lasdkjf</p>
                <p>lasdkjf</p>
                <p>lasdkjf</p>
            </DialogContent>
        </Dialog>
    );
}
