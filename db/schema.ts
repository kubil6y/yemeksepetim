import { pgTable, text } from "drizzle-orm/pg-core";

export const usersSchema = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
});
