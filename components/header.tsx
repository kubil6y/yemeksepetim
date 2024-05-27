import {
    UserButton,
    ClerkLoading,
    ClerkLoaded,
    SignedOut,
    SignedIn,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export const Header = () => {
    return (
        <header>
            <div className="fixed inset-x-0 shadow-2xl">
                <div className="container hidden h-16 items-center justify-between md:flex">
                    <Icons.logo />

                    <div className="flex items-center justify-between gap-x-8">
                        <SignedIn></SignedIn>

                        <SignedOut>
                            <div className="flex justify-between gap-x-4 items-center">
                                <Link href="/sign-in">
                                    <Button variant="outline">Login</Button>
                                </Link>
                                <Link href="/sign-up">
                                    <Button>Register</Button>
                                </Link>
                            </div>
                        </SignedOut>

                        <div>language thing</div>

                        <div>sepet...</div>
                    </div>
                </div>
            </div>
        </header>
    );
};
