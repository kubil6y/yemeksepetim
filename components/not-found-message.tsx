import Link from "next/link";
import { SearchXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

type NotFoundMessageProps = {
    message?: string;
};

export const NotFoundMessage = ({ message }: NotFoundMessageProps) => {
    return (
        <div className="mt-12 flex w-full items-center justify-center bg-white p-5">
            <div className="space-y-5 text-center">
                <div className="inline-flex rounded-full bg-red-100 p-4">
                    <div className="rounded-full bg-red-200 stroke-red-600 p-4">
                        <SearchXIcon className="text-red-500" />
                    </div>
                </div>
                <h1 className="text-4xl font-bold text-slate-800 lg:text-5xl">
                    No Results :(
                </h1>
                <p className="text-slate-600 lg:text-lg">
                    {message ?? "The requested resource could not be found."}
                </p>
                <Button asChild variant="outline">
                    <Link href="/">Home</Link>
                </Button>
            </div>
        </div>
    );
};
