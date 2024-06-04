"use client";

import {
    useGetLatestSearchTerms,
    useLatestSearch,
} from "../hooks/use-latest-search";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { useDebounce, useLockBodyScroll } from "react-use";
import { useClickAways } from "@/hooks/use-click-aways";
import { useEffect, useRef, useState } from "react";
import { useGetSearchResults } from "../api/use-get-search-results";
import { usePathname, useRouter } from "next/navigation";
import { Loader2Icon, SearchIcon, TrashIcon, XIcon } from "lucide-react";

const PLACEHOLDER_TEXT = "Search for restaurants...";
const DURATION = 80;

export const SearchInput = () => {
    const mounted = useMounted();

    // Typing effect
    const [displayedText, setDisplayedText] = useState<string>("");
    const [i, setI] = useState<number>(0);

    const [showResults, setShowResults] = useState<boolean>(false);
    const [input, setInput] = useState<string>("");
    const [debouncedInput, setDebouncedInput] = useState<string>("");
    const [focused, setFocused] = useState<boolean>(false);
    const clickAwayInputRef = useRef(null);
    const clickAwayDropdownRef = useRef(null);

    useLockBodyScroll(showResults);
    useClickAways([clickAwayInputRef, clickAwayDropdownRef], () => {
        setShowResults(false);
    });

    const searchQuery = useGetSearchResults(debouncedInput);

    const debounceInterval = 300;
    useDebounce(
        () => {
            setDebouncedInput(input);
        },
        debounceInterval,
        [input]
    );

    // Typing effect handler
    useEffect(() => {
        const typingEffect = setInterval(() => {
            if (focused) {
                setDisplayedText("");
                setI(0);
                clearInterval(typingEffect);
                return;
            }
            if (i < PLACEHOLDER_TEXT.length) {
                setDisplayedText(
                    (prevState) => prevState + PLACEHOLDER_TEXT.charAt(i)
                );
                setI(i + 1);
            } else {
                clearInterval(typingEffect);
            }
        }, DURATION);
        return () => {
            clearInterval(typingEffect);
        };
    }, [DURATION, i, focused]);

    // Dropdown handler
    useEffect(() => {
        if (focused) {
            setShowResults(true);
        }
    }, [focused]);

    useEffect(() => {
        function listenForEscape(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setShowResults(false);
            }
        }
        document.addEventListener("keydown", listenForEscape);
        return () => {
            document.removeEventListener("keydown", listenForEscape);
        };
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="z-40 w-full">
            {/* Backdrop */}
            {showResults && (
                <div className="absolute inset-0 bg-black/60 scroll-mb-4"></div>
            )}

            <div className="relative w-full">
                <Input
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setShowResults(false);
                            e.currentTarget.blur();
                        }
                    }}
                    ref={clickAwayInputRef}
                    className={cn(
                        "relative z-20 h-12 w-full rounded-full bg-accent px-4 placeholder:font-semibold placeholder:text-primary/60 focus:bg-white sm:h-16 sm:px-6",
                        focused && "bg-white"
                    )}
                    placeholder={displayedText}
                    value={input}
                    // https://github.com/streamich/react-use/blob/master/docs/useDebounce.md
                    onChange={({ currentTarget }) => {
                        setInput(currentTarget.value);
                    }}
                    onFocus={() => {
                        setFocused(true);
                    }}
                    endIcon={input.length > 0 ? XIcon : undefined}
                    endIconOnClick={() => setInput("")}
                    onBlur={() => {
                        setInput("");
                        setFocused(false);
                    }}
                />

                {showResults && (
                    <div
                        className="absolute z-50 mt-1.5 flex w-full flex-col justify-between overflow-hidden rounded-lg border bg-background text-foreground shadow-md"
                        ref={clickAwayDropdownRef}
                    >
                        <div>
                            {debouncedInput.length === 0 ? (
                                <div className="min-h-40 flex items-center justify-center">
                                    <div className="flex items-center gap-2 text-muted-foreground ">
                                        <SearchIcon className="size-6" />
                                        <p className="text-sm italic">
                                            Search for restaurants
                                        </p>
                                    </div>
                                </div>
                            ) : searchQuery.isLoading ? (
                                <div className="min-h-40 flex items-center justify-center">
                                    <Loader2Icon className="loading-icon" />
                                </div>
                            ) : searchQuery.data?.data &&
                                searchQuery.data.data.length == 0 ? (
                                <div className="min-h-40 flex items-center justify-center">
                                    <p className="word-break font-semibold">
                                        No results found for "
                                        {debouncedInput.length > 20
                                            ? debouncedInput.slice(0, 20) +
                                            "..."
                                            : debouncedInput}
                                        "
                                    </p>
                                </div>
                            ) : (
                                <div className="min-h-40">
                                    {searchQuery.data?.data.map((item) => {
                                        const href = `/restaurant/${item.id}`;
                                        const imageSrc = `/assets/brands/${item.imageUrl}`;
                                        return (
                                            <SearchResultItem
                                                key={item.id}
                                                id={item.id}
                                                href={href}
                                                imageUrl={imageSrc}
                                                name={item.name}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <LatestSearchTerms
                            setInput={(s: string) => setInput(s)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

type SearchResultItemProps = {
    id: string;
    name: string;
    href: string;
    imageUrl: string;
};

const SearchResultItem = ({
    id,
    name,
    imageUrl,
    href,
}: SearchResultItemProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const { addItem } = useLatestSearch();

    function onClick() {
        if (pathname !== href) {
            router.push(href);
        }
        addItem(id, name);
    }
    return (
        <div
            className="flex cursor-pointer items-center gap-2 px-4 py-2 transition hover:bg-rose-100"
            onClick={onClick}
        >
            <div className="size-16">
                <Image
                    src={imageUrl}
                    alt={name}
                    width={80}
                    height={80}
                    className="object-contain"
                />
            </div>
            <p className="font-semibold">{name}</p>
        </div>
    );
};

type LatestSearchTermsProps = {
    setInput: (s: string) => void;
};

const LatestSearchTerms = ({ setInput }: LatestSearchTermsProps) => {
    const searchTerms = useGetLatestSearchTerms();
    const { clearAll } = useLatestSearch();
    if (searchTerms.length === 0) {
        return null;
    }
    return (
        <div className="space-y-2 p-4">
            <div className="flex items-center gap-4">
                <p className="text-sm sm:text-lg font-semibold">
                    Latest Searches
                </p>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs text-destructive hover:text-destructive"
                    onClick={clearAll}
                >
                    <TrashIcon className="size-4 mr-2" />
                    Clear All
                </Button>
            </div>
            <div className="flex items-center gap-4">
                {searchTerms.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setInput(item.term)}
                        className="w-auto cursor-pointer rounded-lg border p-1 sm:px-3 sm:py-2 text-xs sm:text-sm shadow transition hover:bg-accent overflow-hidden"
                    >
                        {item.term}
                    </div>
                ))}
            </div>
        </div>
    );
};
