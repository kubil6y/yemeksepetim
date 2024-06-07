"use client";

import Image from "next/image";
import { ClerkLoaded, SignedIn } from "@clerk/nextjs";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useMounted } from "@/hooks/use-mounted";
import { useRestaurantReviewsModal } from "../hooks/use-restaurant-reviews-modal";
import { ReviewForm } from "./review-form";
import { RestauantReviewsList } from "./restaurant-review-list";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RestaurantReviewsModal() {
    const mounted = useMounted();
    const { isOpen, close, restaurantName, restaurantImageSrc, restaurantId } =
        useRestaurantReviewsModal();

    if (!mounted) {
        return null;
    }

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="flex-col h-full w-full">
                {restaurantImageSrc && restaurantName && (
                    <div className="flex gap-4">
                        <Image
                            src={restaurantImageSrc}
                            alt={restaurantName}
                            width={50}
                            height={50}
                            className="rounded-lg object-contain"
                        />
                        <p className="text-3xl">{restaurantName}</p>
                    </div>
                )}

                <ClerkLoaded>
                    <SignedIn>
                        <ReviewForm />
                    </SignedIn>
                </ClerkLoaded>

                <ScrollArea className="h-auto min-h-[400px]">
                    <RestauantReviewsList restaurantId={restaurantId}/>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
