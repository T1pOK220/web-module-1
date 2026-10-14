export function validationProblem(message, details) {
  return {
    error: {
      code: "VALIDATION_ERROR",
      message,
      details,
    },
  };
}

export function notFoundProblem() {
  return {
    error: {
      code: "ORDER_NOT_FOUND",
      message: "Order not found",
    },
  };
}