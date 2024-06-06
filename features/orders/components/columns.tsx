"use client";

import { formatCurrency, maxChar } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { CopyIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/column-header";
import { client } from "@/lib/hono";
import { InferResponseType } from "hono";
import Image from "next/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
export type ResponseType = InferResponseType<
    typeof client.api.orders.$get,
    200 // HTTP Status code
>["data"][0];

export const columns: ColumnDef<ResponseType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "orderId",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Order ID" />;
        },
        cell: ({ row }) => {
            const orderId = row.original.orderId;
            return (
                <div className="flex items-center italic gap-2">
                    <p>{maxChar(orderId, 7)}</p>
                    <CopyIcon
                        className="size-4 cursor-pointer text-muted-foreground"
                        onClick={() => {
                            navigator.clipboard.writeText(orderId);
                        }}
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "imageUrl",
        header: "Image",
        cell: ({ row }) => {
            const imageSrc = "/assets/" + row.original.imageUrl;
            return (
                <div className="w-20 h-20 flex items-center justify-center">
                    <Image
                        src={imageSrc}
                        height={80}
                        width={80}
                        alt={row.original.description}
                        className="object-contain"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Name" />;
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Created At" />;
        },
        cell: ({ row }) => {
            return <div>{format(row.original.createdAt, "MMMM dd, yyyy HH:mm")}</div>;
        },
    },
    {
        accessorKey: "description",
        header: () => <div>Description</div>,
        cell: ({ row }) => {
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <p className="text-sm cursor-pointer">
                                {maxChar(row.original.description, 12)}
                            </p>
                        </TooltipTrigger>
                        <TooltipContent>
                            {row.original.description}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            );
        },
    },
    {
        accessorKey: "price",
        header: ({ column }) => {
            return <DataTableColumnHeader column={column} title="Price" />;
        },
        cell: ({ row }) => {
            const formatted = formatCurrency(parseFloat(row.getValue("price")));
            return <div className="font-medium">{formatted}</div>;
        },
    },
];
