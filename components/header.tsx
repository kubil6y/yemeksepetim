import {
    UserButton,
    ClerkLoading,
    ClerkLoaded,
    SignedOut,
    SignedIn,
    SignIn,
    SignInButton,
    SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Loader2Icon, ShoppingBasketIcon, UserIcon } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "./icons";

export const Header = () => {
    return (
        <header>
            <div className="fixed inset-x-0 shadow-2xl">
                {/* LARGE SCREEN */}
                <div className="container hidden h-16 items-center justify-between md:flex">
                    <Logo />

                    <div className="flex items-center justify-between gap-x-8">
                        <ShoppingBasket />

                        <ClerkLoading>
                            <Loader2Icon className="loading-icon" />
                        </ClerkLoading>

                        <ClerkLoaded>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>

                            <SignedOut>
                                <div className="flex items-center justify-between gap-x-4">
                                    <Button variant="outline" asChild>
                                        <Link href="/sign-in">Login</Link>
                                    </Button>

                                    <Button asChild>
                                        <Link href="/sign-up">Register</Link>
                                    </Button>
                                </div>
                            </SignedOut>
                        </ClerkLoaded>
                    </div>
                </div>

                {/* MOBILE */}
                <div className="container flex h-16 items-center justify-between md:hidden">
                    <div className="flex items-center justify-between gap-x-8">
                        <ClerkLoading>
                            <Loader2Icon className="loading-icon" />
                        </ClerkLoading>

                        <ClerkLoaded>
                            <SignedIn>
                                <UserButton afterSignOutUrl="/" />
                            </SignedIn>
                            <SignedOut>
                                <SignedOutUserIcon />
                            </SignedOut>
                        </ClerkLoaded>
                    </div>

                    <Logo />

                    <ShoppingBasket />
                </div>
            </div>
        </header>
    );
};

function SignedOutUserIcon() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="icon" variant="outline" className="rounded-full">
                    <UserIcon className="size-5 text-primary" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center justify-center mb-4">
                        <Icons.logo />
                    </div>

                    <DialogTitle className="text-start text-2xl">
                        Welcome!
                    </DialogTitle>
                    <DialogDescription className="text-start">
                        Please sign up or log in to proceed.
                    </DialogDescription>
                </DialogHeader>

                <div className="mt-8 flex flex-col items-center space-y-4">
                    <div className="w-full space-y-4">
                        <Button asChild className="w-full">
                            <SignInButton>Login</SignInButton>
                        </Button>
                        <Button asChild className="w-full" variant="outline">
                            <SignUpButton>Register</SignUpButton>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function ShoppingBasket() {
    return (
        <Button asChild size="icon" variant="outline" className="rounded-full">
            <Link href="/restaurants">
                <ShoppingBasketIcon className="size-5 text-primary" />
            </Link>
        </Button>
    );
}
