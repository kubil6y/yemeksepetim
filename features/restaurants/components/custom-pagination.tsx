"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Metadata } from "@/lib/filters";
import { cn } from "@/lib/utils";
import { useSearchParams, usePathname } from "next/navigation";

type CustomPaginationProps = {
    metadata: Metadata;
};

export const CustomPagination = ({ metadata }: CustomPaginationProps) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = searchParams.get("page")
        ? Number(searchParams.get("page"))
        : 1;

    const totalPages = Math.ceil(metadata.total_records / metadata.page_size);
    const paginationItems = generatePagination(currentPage, totalPages);
    const isPrevDisabled = currentPage <= 1;
    const isNextDisabled = currentPage >= totalPages;

    function generateUrl(page: number | string) {
        const params = new URLSearchParams(searchParams);
        params.set("page", page.toString());
        return `${pathname}?${params.toString()}`;
    }

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    {!isPrevDisabled && (
                        <PaginationPrevious
                            href={generateUrl(currentPage - 1)}
                        />
                    )}
                </PaginationItem>
                {paginationItems.length > 1 && paginationItems.map((item, i) => (
                    <PaginationItem key={i}>
                        {item === "E" ? (
                            <PaginationEllipsis />
                        ) : (
                            <div
                                className={cn(
                                    item === currentPage &&
                                    "pointer-events-none"
                                )}
                            >
                                <PaginationLink
                                    href={generateUrl(item)}
                                    isActive={item === currentPage}
                                >
                                    {item}
                                </PaginationLink>
                            </div>
                        )}
                    </PaginationItem>
                ))}

                {!isNextDisabled && (
                    <PaginationNext
                        href={generateUrl(currentPage + 1)}
                        className={cn(isNextDisabled && "text-foreground/50")}
                    />
                )}
            </PaginationContent>
        </Pagination>
    );
};

function generatePagination(currentPage: number, totalPages: number) {
    if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
        return [1, 2, 3, "E", totalPages - 1, totalPages];
    }
    if (currentPage >= totalPages - 2) {
        return [1, 2, "E", totalPages - 2, totalPages - 1, totalPages];
    }
    return [
        1,
        "E",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "E",
        totalPages,
    ];
}
