"use client";

import { BasketSheet } from "@/features/basket/components/basket-sheet"
import { useMounted } from "@/hooks/use-mounted"

export const SheetProvider = () => {
    const mounted = useMounted();
    if (!mounted) {
        return null;
    }
    return (
        <>
            <BasketSheet />
        </>
    )
}
