"use client";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { useFilterModal } from "../hooks/use-filter-modal";
import { FiltersForm } from "./filters-form";

export function FilterModal() {
    const { isOpen, close } = useFilterModal();
    return (
        <Dialog open={isOpen} onOpenChange={close} >
            <DialogContent className="sm:max-w-[425px] mx-auto">
                <FiltersForm onApply={close} />
            </DialogContent>
        </Dialog>
    );
}
