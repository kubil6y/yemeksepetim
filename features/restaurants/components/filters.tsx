"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiltersForm } from "./filters-form";
import { useFilterModal } from "../hooks/use-filter-modal";
import { SlidersHorizontalIcon } from "lucide-react";
import {useMedia} from "react-use";

export const FilterDesktop = () => {
    const isMobile = useMedia("(max-width: 1024px)", false);
    if (isMobile) {
        return null;
    }
    return (
        <div className="pt-32 block">
            <Card className="w-[240px] mt-16">
                <FiltersForm />
            </Card>
        </div>
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
