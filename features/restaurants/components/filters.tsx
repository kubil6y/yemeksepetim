"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiltersForm } from "./filters-form";
import { useFilterModal } from "../hooks/use-filter-modal";
import { SlidersHorizontalIcon } from "lucide-react";
import { useMedia } from "react-use";

export const FilterDesktop = () => {
    const isMobile = useMedia("(max-width: 1024px)", false);
    if (isMobile) {
        return null;
    }
    return (
        <div className="block pt-32 shrink-0 w-[240px]">
            <Card>
                <FiltersForm />
            </Card>
        </div>
    );
};

export const FilterModalButton = () => {
    const isSmall = useMedia("(min-width: 640px)", false);
    const filterModal = useFilterModal();
    return (
        <Button
            className="flex items-center gap-2 rounded-full"
            variant="outline"
            onClick={filterModal.open}
            size="xl"
        >
            <SlidersHorizontalIcon className="size-5 text-foreground" />
            {isSmall && <span className="block sm ml-4">Filter</span>}
        </Button>
    );
};
