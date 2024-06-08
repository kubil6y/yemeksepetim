import { foods } from "@/db/schema";
import { foodsMcdonalds } from "./mcdonalds";
import { foodsStarbucks } from "./starbucks";
import { foodsLittleCaesars } from "./litte-caesars";

export function generateFoodsData(): (typeof foods.$inferSelect)[] {
    return [...foodsMcdonalds, ...foodsStarbucks, ...foodsLittleCaesars];
}
