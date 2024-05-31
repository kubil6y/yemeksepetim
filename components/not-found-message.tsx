import { SearchXIcon } from "lucide-react";

export const NotFoundMessage = () => {
    return (
        <div className="mt-12 flex w-full items-center justify-center bg-white p-5">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-red-100 p-4">
                    <div className="rounded-full bg-red-200 stroke-red-600 p-4">
                        <SearchXIcon className="text-red-500" />
                    </div>
                </div>
                <h1 className="mt-5 text-3xl font-bold text-slate-800 lg:text-5xl">
                    No Results :(
                </h1>
                <p className="mt-5 text-slate-600 lg:text-lg">
                    The requested resource could not be found.
                </p>
            </div>
        </div>
    );
};
