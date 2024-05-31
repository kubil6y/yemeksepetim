import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";
import { Context } from "hono";
import { isConvertibleToInt } from "./utils";

// Setting up rpc client
export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!);

export function readString(
    c: Context,
    key: string,
    defaultValue: string
): string {
    const s = c.req.query(key);
    if (!s) {
        return defaultValue;
    }
    return s;
}

export function readInt(c: Context, key: string, defaultValue: number): number {
    const s = c.req.query(key);
    if (!s) {
        return defaultValue;
    }
    if (isConvertibleToInt(s)) {
        return parseInt(s);
    } else {
        return defaultValue;
    }
}

export function readCSV(
    c: Context,
    key: string,
    defaultValue: string[]
): string[] {
    const csv = c.req.query(key);
    if (!csv) {
        return defaultValue;
    }
    return csv.split(",");
}
