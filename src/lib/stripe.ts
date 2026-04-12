export const stripe = null;
export function formatAmount(amount: number, currency = "inr"): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: currency.toUpperCase() }).format(amount);
}
