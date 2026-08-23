/**
 * Single source of mock data for the app.
 * Swap these values for real API calls later — the UI reads only from here.
 */
export const mockUser = {
  balanceUsdt: "42.50",
  totalEarnedUsdt: "58.20",
  tasksDone: "12",
  level: "Pro",
  availableUsdt: "42.50",
  minWithdrawalNote: "Min. withdrawal 10 USDT · TRC20 network",
  notifications: 2,
};

export type MockUser = typeof mockUser;
