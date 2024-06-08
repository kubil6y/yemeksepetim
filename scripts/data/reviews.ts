import { restaurantReviewRatings, restaurantReviews } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { faker } from "@faker-js/faker";

const gptReviews = [
    "Fast delivery and tasty!",
    "Loved the friendly service.",
    "Food arrived hot and fresh.",
    "Great value for money.",
    "Delicious and quick!",
    "Perfect for a quick lunch.",
    "Always reliable and tasty.",
    "Impressed by the speed!",
    "My go-to spot for takeout.",
    "Never disappointed with the quality.",
    "Consistently good food.",
    "Affordable and delicious.",
    "Great customer service.",
    "Quick and easy ordering.",
    "Excellent coffee and snacks.",
    "Yummy food, fast service.",
    "Convenient and tasty.",
    "Perfect for a busy day.",
    "Fast, friendly, and fresh.",
    "Always hits the spot!",
    "Prompt delivery and the burger was fantastic!",
    "Love the coffee, it's always fresh and strong.",
    "Quick service and the food is always spot on.",
    "My favorite place for a quick breakfast.",
    "Affordable prices and tasty meals.",
    "Friendly staff and fast service, highly recommend!",
    "Perfect spot for a quick bite.",
    "Always a great experience ordering here.",
    "Love their sandwiches, always fresh and tasty.",
    "Fast, delicious, and never disappoints.",
    "Convenient app and great food options.",
    "Excellent service and the food was still hot on arrival.",
    "The app is user-friendly and the food is great.",
    "Great for a quick lunch break, fast delivery!",
    "Food is consistently good and the app works well.",
    "Love the breakfast menu, fast and tasty.",
    "Quick delivery and the coffee is top-notch.",
    "Never had an issue with my orders, always perfect.",
    "Great variety of options and quick service.",
    "Perfect for busy mornings, love the fast service.",
    "The burgers are always juicy and delicious.",
    "App makes ordering super easy and fast.",
    "Food is always delivered hot and fresh.",
    "Great for a quick and satisfying meal.",
    "Consistently good food and fast delivery.",
    "Easy to order and the food is always great.",
    "Love the convenience and the quality of food.",
    "Fast service and the food is always delicious.",
    "Never a long wait, and the food is awesome.",
    "Great app, easy to use and quick delivery.",
    "Food is always on point, fast and tasty.",
    "Perfect for when I'm in a rush, fast service.",
    "The food is always fresh and the delivery is fast.",
    "Love the app, makes ordering super convenient.",
    "Quick, reliable, and the food is great.",
    "Always a pleasure ordering from here, fast service.",
    "Great coffee and fast delivery, my favorite spot.",
    "Perfect for quick meals, never disappointed.",
    "The food quality is always high and delivery is quick.",
    "App is intuitive and the food arrives fast.",
    "Fast delivery and the burgers are amazing.",
    "Great for quick breakfasts, love the service.",
    "Always fast, always delicious, never any issues.",
    "App is great, food is even better.",
    "Quick service, friendly staff, and tasty food.",
    "Never had an issue, food is always great.",
    "Love how fast the food arrives, always fresh.",
    "Convenient and reliable, food is always good.",
    "Perfect for busy days, quick and tasty meals.",
    "Fast and reliable service with delicious food options.",
];

export function generateRestaurantReviews(
    n: number,
    restaurantIds: string[]
): (typeof restaurantReviews.$inferSelect)[] {
    const data: (typeof restaurantReviews.$inferSelect)[] = [];
    for (let i = 0; i < n; ++i) {
        data.push({
            id: createId(),
            text: gptReviews[Math.floor(Math.random() * gptReviews.length)],
            score: Math.floor(Math.random() * 5) + 1,
            userId: createId(),
            username: faker.person.firstName() + " " + faker.person.lastName(),
            createdAt: new Date(),
            restaurantId:
                restaurantIds[Math.floor(Math.random() * restaurantIds.length)],
        });
    }
    return data;
}

export function generateRestaurantReviewRatings(
    n: number,
    reviewsData: (typeof restaurantReviews.$inferSelect)[]
) {
    const data: (typeof restaurantReviewRatings.$inferSelect)[] = [];
    for(let i = 0; i < n; ++i) {
        const randomReviewIndex = Math.floor(Math.random() * reviewsData.length);
        data.push({
            id: createId(), 
            userId: reviewsData[randomReviewIndex].userId,
            restaurantReviewId: reviewsData[randomReviewIndex].id,
        })
    }
    return data;
}
