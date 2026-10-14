const orders = [];


export async function persistOrderWithContext(order) {
  orders.push(order);
  return order;
}
export async function getAllOrders() {

  return orders;
}
export async function existingOrder(orderId) {
   return orders.find((order) => order.id === orderId) ?? null;
} 
export async function orderIndex(orderId) {
  const index =  orders.findIndex((order) => order.id === orderId)?? null;
  if(index !== -1) orders.splice(orderIndex, 1);
  return 
}