import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function sleep(ms: number): Promise<void> {
    return new Promise((res, _rej) => setTimeout(res, ms));
}

export function formatCurrency(value: number) {
    return Intl.NumberFormat("tr-TR", {
        style: "currency",
        currency: "TRY",
        minimumFractionDigits: 0,
    }).format(value);
}

export function isConvertibleToInt(value: any): boolean {
    try {
        let convertedValue = parseInt(value, 10);
        return !isNaN(convertedValue) && Number.isInteger(convertedValue);
    } catch (e) {
        return false;
    }
}

export function isConvertibleToFloat(value: any): boolean {
    try {
        let convertedValue = parseFloat(value);
        return !isNaN(convertedValue);
    } catch (e) {
        return false;
    }
}

export function maxChar(s: string, maxLength: number): string {
    if (s.length < maxLength) {
        return s;
    }
    return s.slice(0, maxLength) + "...";
}

export function formatName(firstName: string | null, lastName: string | null, username: string | null): string {
    if (username) {
        return username;
    }
    if (!firstName || !lastName) {
        return "Anonymous User";
    }
    let formattedLastName = "";
    if (lastName.length > 0) {
        formattedLastName += lastName[0];
        const remainingLength = lastName.length - 1;
        if (remainingLength > 0) {
            const stars = new Array(remainingLength).fill("*").join("");
            formattedLastName += stars;
        }
    }
    return firstName + " " + formattedLastName;
}
