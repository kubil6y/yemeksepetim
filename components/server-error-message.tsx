import { ServerOffIcon } from "lucide-react";

export const ServerErrorMessage = () => {
    return (
        <div className="flex w-full items-center justify-center bg-white p-5 mt-12">
            <div className="text-center">
                <div className="inline-flex rounded-full bg-red-100 p-4">
                    <div className="rounded-full bg-red-200 stroke-red-600 p-4">
                        <ServerOffIcon className="text-red-500" />
                    </div>
                </div>
                <h1 className="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">
                    500 - Server error
                </h1>
                <p className="mt-5 text-slate-600 lg:text-lg">
                    Oops something went wrong.
                </p>
            </div>
        </div>
    );
};
