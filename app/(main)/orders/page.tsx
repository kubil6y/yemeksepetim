import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OrdersList } from "@/features/orders/components/orders-list";
import { Undo2Icon } from "lucide-react";

export default function OrderHistoryPage() {
    return (
        <div className="container pt-24">
            <div className="flex items-baseline gap-4">
                <h1 className="text-3xl sm:text-5xl">Order History</h1>
                <Button
                    variant="ghost"
                    className="text-primary hover:text-primary"
                    asChild
                >
                    <Link href="/restaurants">
                        <Undo2Icon className="size-4 mr-2" />
                        Home
                    </Link>
                </Button>
            </div>
            <OrdersList />
        </div>
    );
}
