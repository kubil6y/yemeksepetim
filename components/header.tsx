import {
    UserButton,
    ClerkLoading,
    ClerkLoaded,
    SignedOut,
    SignedIn,
    SignInButton,
    SignUpButton,
} from "@clerk/nextjs";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "./icons";
import { ShoppingBasket } from "@/features/basket/components/shopping-basket";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Loader2Icon, UserIcon } from "lucide-react";
import { HistoryButton } from "./history-button";

export const Header = () => {
    return (
        <header className="fixed inset-x-0 shadow-lg z-50 bg-white">
            {/* LARGE SCREEN */}
            <div className="container hidden h-16 items-center justify-between md:flex">
                <Logo />

                <div className="flex items-center justify-between gap-x-8">
                    <div className="gap-x-4 flex items-center">
                        <GithubLink />
                        <HistoryButton />
                        <ShoppingBasket />
                    </div>

                    <ClerkLoading>
                        <Loader2Icon className="loading-icon" />
                    </ClerkLoading>

                    <ClerkLoaded>
                        <SignedIn>
                            <UserButton
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        button: {
                                            width: 34,
                                            height: 34,
                                            "&:focus": {
                                                boxShadow: "none",
                                                outline: "2px solid #e11d48",
                                                offset: "2px",
                                            },
                                        },
                                    },
                                }}
                            />
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

                <div className="gap-x-2 flex items-center">
                    <GithubLink />
                    <HistoryButton />
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

function GithubLink() {
    return (
        <Button
            size="icon"
            variant="outline"
            className="flex cursor-pointer items-center justify-center rounded-full"
            asChild
        >
            <Link href="https://github.com/kubil6y/yemeksepetim" target="_blank">
                <Icons.github className="size-5" />
            </Link>
        </Button>
    )
}
