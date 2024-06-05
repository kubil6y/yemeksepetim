import { Button } from "@/components/ui/button";
import { OrdersList } from "@/features/orders/components/orders-list";
import { Undo2Icon } from "lucide-react";

export default function OrderHistoryPage() {
    return (
        <div className="container pt-24">
            <div className="flex gap-4 items-baseline">
                <h1 className="text-3xl sm:text-5xl">Order History</h1>
                <Button variant="ghost" className="text-primary hover:text-primary">
                    <Undo2Icon className="mr-2 size-4"/>
                    Home
                </Button>
            </div>
            <OrdersList />
        </div>
    );
}
