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
            className="rounded-full flex gap-2 items-center"
            variant="outline"
            onClick={filterModal.open}
            size="xl"
        >
            <SlidersHorizontalIcon className="size-5 text-foreground" />{" "}
            <span className="ml-4">Filters</span>
        </Button>
    );
};
