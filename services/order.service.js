import { orderResponse } from "../api/mappers/order.mappers.js";
import { randomUUID } from "node:crypto";
import * as orderRepository from "../repositories/order.repository.js";
import { DEFAULT_ORDER_STATUS } from "../config/constants.js";
export function makeOrderId() {
  return `ord-${randomUUID().slice(0, 8)}`;
}

export function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function calculateTotal(items) {
  return roundMoney(
    items.reduce((sum, item) => sum + item.quantity * item.price, 0),
  );
}
export const createOrder = async(normalizedCustomerName,items)=> {
  const serverCalculatedTotal = calculateTotal(items);
    const status = DEFAULT_ORDER_STATUS;
    const newOrder = {
      id: makeOrderId(),
      customerName: normalizedCustomerName,
      items,
      total: serverCalculatedTotal,
      status,
      createdAt: new Date().toISOString(),
    };
    const storedOrder = await orderRepository.persistOrderWithContext(newOrder);
    return orderResponse(storedOrder);
}
export const getOrders = async()=>{
  const orders = await orderRepository.getAllOrders();
  const result = orders.map((order) => orderResponse(order))
  return {
    orders: result,
    count: result.length,
  }; 
}
export const getOneOrder = async(requestedId)=>{
    const matchingOrder = await orderRepository.existingOrder(requestedId);
    if (!matchingOrder) {
    return null
    }
    return orderResponse(matchingOrder);
}
export const deleteOrder = async (orderId)=>{
     const order = await orderRepository.existingOrder(orderId)
    if (!order) {
      return null
    }
    const orderIndex = orderRepository.orderIndex(orderId);
    if (orderIndex === -1) {
      return null
    }
    return true;
}