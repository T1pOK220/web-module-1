import express from "express"
import * as ordersController from "../controllers/orders.controller.js";
const router = express.Router();
router.get("/orders",ordersController.getOrdersController);
router.get("/orders/:id",ordersController.getOneOrderController);
router.post("/orders",ordersController.createOrderController);
router.delete("/orders/:id",ordersController.deleteOrderController);
export default router;