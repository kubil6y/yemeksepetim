import { z } from "zod";
import { Filters } from "./filters";

const restaurantQuerySafesortList = ["suggested", "food_rating", "restaurant_rating"] as const;

const restaurantsQueryFiltersSchema = z.object({
    page: z.number().min(1).max(1_000),
    pageSize: z.number().min(1).max(100),
    sorting: z.enum(restaurantQuerySafesortList),
});

export class RestaurantsQueryFilters {
    public sorting: string;
    public categories: string[];
    public minOrderAmount: number;
    public filters: Filters;

    public constructor() {
        this.sorting = "";
        this.categories = [];
        this.minOrderAmount = 50;
        this.filters = new Filters();
        this.filters.sortSafelist = [...restaurantQuerySafesortList];
    }

    public getCategories(): string[] | undefined {
        return this.categories.length > 0 ? this.categories : undefined;
    }

    public validate() {
        // TODO a better error response might be suitable
        return restaurantsQueryFiltersSchema.safeParse({
            page: this.filters.page,
            pageSize: this.filters.pageSize,
            sorting: this.sorting,
        });
    }
}
