// src/lib/order-utils.ts

export function calculateOrderPrice(rate: number, quantity: number): number {
  if (rate < 0 || quantity < 0) throw new Error("Negative values not allowed");
  return parseFloat(((rate / 1000) * quantity).toFixed(2));
}

export function validateQuantity(quantity: number, min: number, max: number): boolean {
  return Number.isInteger(quantity) && quantity >= min && quantity <= max;
}

export function hasInsufficientBalance(balance: number, price: number): boolean {
  return balance < price;
}

export function formatOrderStatus(status: string): string {
  return status
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function calculateDiscount(totalPrice: number, discountPercent: number): number {
  if (discountPercent < 0 || discountPercent > 100)
    throw new Error("Discount must be between 0 and 100");
  return parseFloat((totalPrice * (1 - discountPercent / 100)).toFixed(2));
}

export function getOrderStatusColor(status: string): string {
  const map: Record<string, string> = {
    PENDING: "yellow",
    IN_PROGRESS: "blue",
    COMPLETED: "green",
    PARTIAL: "orange",
    CANCELLED: "red",
  };
  return map[status] ?? "gray";
}
