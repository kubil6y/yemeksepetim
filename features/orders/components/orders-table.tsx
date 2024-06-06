"use client";

import {
    CookingPotIcon,
    GalleryVerticalEnd,
    HomeIcon,
    Loader2Icon,
} from "lucide-react";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./columns";
import { useGetOrders } from "../api/use-get-orders";
import { ServerErrorMessage } from "@/components/server-error-message";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export const OrdersTable = () => {
    const mounted = useMounted();
    const [total, setTotal] = useState<number>(0);
    const ordersQuery = useGetOrders();
    if (!mounted) {
        return null;
    }
    if (ordersQuery.isLoading) {
        return (
            <div className="w-full flex items-center justify-center pt-24">
                <Loader2Icon className="loading-icon" />
            </div>
        );
    }
    if (ordersQuery.isError) {
        return <ServerErrorMessage />;
    }
    if (ordersQuery.data?.length === 0 || !ordersQuery.data) {
        return <EmptyOrderHistory />;
    }
    return (
        <div className="pb-16">
            <DataTable
                columns={columns}
                data={ordersQuery.data}
                filterKey={"orderId"}
                onSelected={(rows) => {
                    let total = 0;
                    for (const row of rows) {
                        total += row.price;
                    }
                    setTotal(total);
                }}
            />
            <p className="text-end text-2xl md:text-5xl">Total {formatCurrency(total)}</p>
        </div>
    );
};

function EmptyOrderHistory() {
    return (
        <div className="my-32 flex h-60 w-full flex-col items-center justify-center gap-12">
            <div className="inline-flex rounded-full bg-red-100 p-4">
                <div className="rounded-full bg-red-200 stroke-red-600 p-4">
                    <GalleryVerticalEnd className="text-red-500" />
                </div>
            </div>
            <p className="text-3xl font-semibold sm:text-5xl">
                You have not shopped yet!
            </p>

            <div className="flex w-full justify-center gap-2 ">
                <Button asChild className="w-1/2 sm:w-auto">
                    <Link href="/">
                        <HomeIcon className="size-5 mr-2.5 text-primary-foreground" />
                        Home
                    </Link>
                </Button>

                <Button asChild className="w-1/2 sm:w-auto">
                    <Link href="/restaurants">
                        <CookingPotIcon className="size-5 mr-2.5 text-primary-foreground" />
                        Restaurants
                    </Link>
                </Button>
            </div>
        </div>
    );
}
