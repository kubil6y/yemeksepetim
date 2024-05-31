"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiltersForm } from "./filters-form";
import { useFilterModal } from "../hooks/use-filter-modal";
import { SlidersHorizontalIcon } from "lucide-react";

export const FilterDesktop = () => {
    return (
        <Card className="sticky left-0 top-[120px] hidden h-[640px] w-[320px] overflow-y-auto lg:block lg:shrink-0">
            <FiltersForm />
        </Card>
    );
};

export const FilterModalButton = () => {
    const filterModal = useFilterModal();
    return (
        <Button
            className=""
            variant="outline"
            onClick={filterModal.open}
        >
            <SlidersHorizontalIcon className="text-foreground mr-2 size-5" /> Filters
        </Button>
    );
};
