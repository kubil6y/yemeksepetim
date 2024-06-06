CREATE TABLE IF NOT EXISTS "restaurant_review_ratings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"restaurant_review_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "restaurant_reviews" RENAME COLUMN "user_name" TO "username";--> statement-breakpoint
ALTER TABLE "restaurant_reviews" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurant_review_ratings" ADD CONSTRAINT "restaurant_review_ratings_restaurant_review_id_restaurant_reviews_id_fk" FOREIGN KEY ("restaurant_review_id") REFERENCES "public"."restaurant_reviews"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
