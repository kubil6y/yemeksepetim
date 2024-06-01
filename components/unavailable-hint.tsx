import { cn } from "@/lib/utils";
import { ShieldAlertIcon } from "lucide-react";

type UnavailableHintProps = {
    className?: string;
};

export const UnavailableHint = ({ className }: UnavailableHintProps) => {
    return (
        <div
            className={cn(
                "flex items-center gap-1 text-xs text-destructive",
                className
            )}
        >
            <ShieldAlertIcon className="size-4" />
            Unavailable
        </div>
    );
};
