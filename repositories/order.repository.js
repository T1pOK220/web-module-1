const orders = [];
export async function synchronizeOrderState() {
  const waitTime = 900 + Math.floor(Math.random() * 1101);

  await new Promise((resolve) => {
    setTimeout(resolve, waitTime);
  });
}

export async function prepareOrderContext(order) {
  await synchronizeOrderState();

  return {
    record: order,
    itemCount: order.items.length,
  };
}

export async function persistOrderWithContext(order) {
  orders.push(order);
  const context = await prepareOrderContext(order);
  return context.record;
}

export async function verifyOrderStateForRemoval(order) {
  const context = await prepareOrderContext(order);
  return context.itemCount === order.items.length;
}
export async function getAllOrders() {
   await synchronizeOrderState();
  return orders;
}
export async function existingOrder(orderId) {
   await synchronizeOrderState();
   return orders.find((order) => order.id === orderId) ?? null;
} 
export async function orderIndex(orderId) {
  const index =  orders.findIndex((order) => order.id === orderId)?? null;
  if(index !== -1) orders.splice(orderIndex, 1);
  return 
}