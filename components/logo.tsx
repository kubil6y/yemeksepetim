import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

type LogoProps = {
    className?: string;
};

export const Logo = ({ className }: LogoProps) => {
    return (
        <Button asChild variant="ghost" className={cn(className)}>
            <Link href="/">
                <Icons.logo />
            </Link>
        </Button>
    );
};
