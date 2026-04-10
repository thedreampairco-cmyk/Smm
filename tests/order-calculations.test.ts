// tests/order-calculations.test.ts
import { describe, it, expect } from "vitest";
import {
  calculateOrderPrice,
  validateQuantity,
  hasInsufficientBalance,
  formatOrderStatus,
  calculateDiscount,
  getOrderStatusColor,
} from "../src/lib/order-utils";

describe("calculateOrderPrice", () => {
  it("calculates correct price for 1000 units", () => {
    expect(calculateOrderPrice(1.99, 1000)).toBe(1.99);
  });

  it("calculates correct price for 500 units", () => {
    expect(calculateOrderPrice(2.00, 500)).toBe(1.00);
  });

  it("calculates correct price for 10000 units", () => {
    expect(calculateOrderPrice(0.49, 10000)).toBe(4.90);
  });

  it("returns 0 for 0 quantity", () => {
    expect(calculateOrderPrice(1.99, 0)).toBe(0);
  });

  it("throws for negative rate", () => {
    expect(() => calculateOrderPrice(-1, 1000)).toThrow();
  });

  it("throws for negative quantity", () => {
    expect(() => calculateOrderPrice(1.99, -100)).toThrow();
  });
});

describe("validateQuantity", () => {
  it("accepts valid quantity within range", () => {
    expect(validateQuantity(500, 100, 10000)).toBe(true);
  });

  it("accepts exact min value", () => {
    expect(validateQuantity(100, 100, 10000)).toBe(true);
  });

  it("accepts exact max value", () => {
    expect(validateQuantity(10000, 100, 10000)).toBe(true);
  });

  it("rejects quantity below min", () => {
    expect(validateQuantity(50, 100, 10000)).toBe(false);
  });

  it("rejects quantity above max", () => {
    expect(validateQuantity(20000, 100, 10000)).toBe(false);
  });

  it("rejects non-integer quantity", () => {
    expect(validateQuantity(500.5, 100, 10000)).toBe(false);
  });
});

describe("hasInsufficientBalance", () => {
  it("returns true when balance is less than price", () => {
    expect(hasInsufficientBalance(5.00, 10.00)).toBe(true);
  });

  it("returns false when balance equals price", () => {
    expect(hasInsufficientBalance(10.00, 10.00)).toBe(false);
  });

  it("returns false when balance exceeds price", () => {
    expect(hasInsufficientBalance(100.00, 10.00)).toBe(false);
  });
});

describe("calculateDiscount", () => {
  it("applies 10% discount correctly", () => {
    expect(calculateDiscount(100, 10)).toBe(90);
  });

  it("applies 0% discount (no change)", () => {
    expect(calculateDiscount(50, 0)).toBe(50);
  });

  it("applies 100% discount (free)", () => {
    expect(calculateDiscount(50, 100)).toBe(0);
  });

  it("throws on discount below 0", () => {
    expect(() => calculateDiscount(50, -5)).toThrow();
  });

  it("throws on discount above 100", () => {
    expect(() => calculateDiscount(50, 110)).toThrow();
  });
});

describe("getOrderStatusColor", () => {
  it("returns correct color for PENDING", () => {
    expect(getOrderStatusColor("PENDING")).toBe("yellow");
  });

  it("returns correct color for COMPLETED", () => {
    expect(getOrderStatusColor("COMPLETED")).toBe("green");
  });

  it("returns gray for unknown status", () => {
    expect(getOrderStatusColor("UNKNOWN")).toBe("gray");
  });
});

describe("formatOrderStatus", () => {
  it("formats IN_PROGRESS correctly", () => {
    expect(formatOrderStatus("IN_PROGRESS")).toBe("In Progress");
  });
});
