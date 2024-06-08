import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";
import { categories, foods, restaurantReviewRatings, restaurantReviews, restaurants } from "@/db/schema";
import { restaurantsData } from "./data/restaurants";
import { categoriesData } from "./data/categories";
import { generateRestaurantReviewRatings, generateRestaurantReviews } from "./data/reviews";
import { generateFoodsData } from "./data/foods";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { logger: true });

const restaurantIds = restaurantsData.map((r) => r.id);
const foodsData = generateFoodsData();
const restaurantReviewsData = generateRestaurantReviews(100, restaurantIds);
const restaurantReviewRatingsData = generateRestaurantReviewRatings(250, restaurantReviewsData);

async function main() {
    console.log("Seeding started...");

    console.log("Cleaning up databases...");
    await db.delete(categories).execute();
    await db.delete(restaurants).execute();
    await db.delete(foods).execute();
    await db.delete(restaurantReviewRatings).execute();
    await db.delete(restaurantReviews).execute();
    console.log("Clean up completed!");

    await db.insert(restaurants).values(restaurantsData);
    await db.insert(categories).values(categoriesData);
    await db.insert(foods).values(foodsData);
    await db.insert(restaurantReviews).values(restaurantReviewsData);
    await db.insert(restaurantReviewRatings).values(restaurantReviewRatingsData);

    console.log("Seeding completed!");
}

main();
