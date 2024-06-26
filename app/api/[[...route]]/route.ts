import { Hono } from "hono";
import { handle } from "hono/vercel";
import restaurants from "./restaurants";
import restaurant from "./restaurant";
import categories from "./categories";
import search from "./search";
import reviews from "./reviews";
import orders from "./orders";

const app = new Hono().basePath("/api");

const routes = app
    .route("/restaurants", restaurants)
    .route("/restaurant", restaurant)
    .route("/categories", categories)
    .route("/search", search)
    .route("/reviews", reviews)
    .route("/orders", orders);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
