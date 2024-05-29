CREATE TABLE IF NOT EXISTS "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "foods" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text NOT NULL,
	"price" integer NOT NULL,
	"restaurant_id" text NOT NULL,
	"category_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurants" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"is_popular" boolean DEFAULT false NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "foods" ADD CONSTRAINT "foods_restaurant_id_restaurants_id_fk" FOREIGN KEY ("restaurant_id") REFERENCES "public"."restaurants"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "foods" ADD CONSTRAINT "foods_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
