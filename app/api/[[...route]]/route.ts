import { Hono } from "hono";
import { handle } from "hono/vercel";
import restaurants from "./restaurants";

const app = new Hono().basePath("/api");

const routes = app.route("/restaurants", restaurants);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
