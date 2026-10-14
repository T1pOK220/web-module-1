import * as orderService from "../../services/order.service.js";
import {validateCreateOrder} from "../validators/order.validators.js"
import { validationProblem } from "../../common/error.response.js";
import {normalizeItems} from "../mappers/order.mappers.js"
import { notFoundProblem } from "../../common/error.response.js";
export const createOrderController=async(req,res,next)=>{
     const validationErrors = validateCreateOrder(req.body);
  try{
        if (validationErrors.length > 0) {
           return res
             .status(400)
             .json(validationProblem("Invalid order", validationErrors));
       }
    const normalizedCustomerName = req.body.customerName.trim();
    const items = normalizeItems(req.body.items);
    const responseBody = await orderService.createOrder(normalizedCustomerName,items)
  return res
      .status(201)
      .location(`/orders/${responseBody.id}`)
      .json(responseBody);
} catch (error) {
    return next(error);
}}
export const getOrdersController = async (req,res)=>{
    const responseBody = await orderService.getOrders();
    res.status(200).json(responseBody);
}
export const getOneOrderController = async(req,res,next)=>{
  try{const requestedId = req.params.id;
       const responseBody = await orderService.getOneOrder(requestedId)
       if (!responseBody) {
      return res.status(404).json(notFoundProblem());
    }
    return res.status(200).json(responseBody);
  } catch (error) {
    return next(error);
  }
}
export const deleteOrderController = async (req,res,next)=>{
    try {
         const orderId = req.params.id;
        const response = await orderService.deleteOrder(orderId);
       if (!response) {
      return res.status(404).json(notFoundProblem());
    };
        return res.status(204).send();
    } catch (error) {
        return next(error);
    }
}