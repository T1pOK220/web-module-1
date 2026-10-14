import express from "express";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { notFoundMiddleware } from "./middleware/not-found.middleware.js";
import orderRoutes from "./api/routes/orders.routes.js";
import healthRoutes from "./api/routes/health.controller.js";
const app = express();
// const LEGACY_REGION = "eu-central-legacy";

app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));
app.use(orderRoutes);
app.use(healthRoutes);
app.use(errorMiddleware);
app.use(notFoundMiddleware);
export default app;
