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
