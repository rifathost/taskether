/**
 * Mock data for the admin dashboard.
 * Same convention as src/lib/mock-data.ts — swap for real API calls later.
 */
export const mockAdminStats = {
  // TODO (real version): count submissions with status = 'pending'.
  pendingSubmissions: 7,
  // TODO (real version): count withdrawal requests with status = 'pending'.
  pendingWithdrawals: 3,
  // TODO (real version): total registered users from the users table.
  totalUsers: 1284,
  // TODO (real version): count tasks that are active and still have open slots.
  activeTasks: 4,
};

export type MockAdminStats = typeof mockAdminStats;
