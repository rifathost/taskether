/**
 * Single source of mock data for the app.
 * Swap these values for real API calls later — the UI reads only from here.
 *
 * TODO (real version): task list should be filtered to active tasks with open slots.
 * That filtering isn't needed yet with mock data, but should be applied once
 * the backend is wired up.
 */
export const mockUser = {
  balanceUsdt: "42.50",
  totalEarnedUsdt: "58.20",
  tasksDone: "12",
  level: "Pro",
  availableUsdt: "42.50",
  minWithdrawalNote: "Min. withdrawal 10 USDT · TRC20 network",
  notifications: 2,
  name: "Fahim Ahmed",
  telegramHandle: "@fahim_ah",
  /**
   * TODO (real version): when no wallet address is saved yet, the Wallet Address
   * row should show a "Set your wallet address" prompt instead of a truncated
   * address. That empty-state variant isn't needed for this mock pass.
   */
  walletAddress: "TXy8bQ4nRzP2mK7vL5tH9jW3aS6cD1eF4gH8iJ0kL2mN4oP6qR8sT0uV2wX4yZ6aB8cD0eF2gH4iJ6kL8mN0oP2qR4sT6uV8wX0yZ2aB4c",
};

export type MockUser = typeof mockUser;

export const mockTasks = [
  {
    id: "1",
    type: "Join Channel",
    title: "Join TaskEther Announcements",
    rewardAmount: 0.5,
    instructions:
      "Join our Telegram announcement channel and stay a member. Tap the link below, join the channel, then come back here and submit your Telegram username or a screenshot as proof.",
  },
  {
    id: "2",
    type: "Visit Website",
    title: "Visit Partner Website",
    rewardAmount: 0.3,
    instructions:
      "Open the partner website using the link below and browse for at least 30 seconds. Once finished, paste the URL you landed on or describe what you saw in the proof field.",
  },
  {
    id: "3",
    type: "Survey",
    title: "Complete a Quick Survey",
    rewardAmount: 0.75,
    instructions:
      "Answer a short survey about your experience with mini apps. Fill out all required questions, then submit the completion code or a summary of your answers below.",
  },
  {
    id: "4",
    type: "Custom",
    title: "Follow Us on X (Twitter)",
    rewardAmount: 0.4,
    instructions:
      "Follow the TaskEther account on X (formerly Twitter). After following, paste your X username or the link to your profile in the proof field so we can verify.",
  },
] as const;

export type MockTask = (typeof mockTasks)[number];

/**
 * Level progress and tier thresholds.
 * TODO (real version): compute tasksCompleted from the user's finished tasks;
 * current tier should be derived from that count on the server.
 */
export const mockLevelProgress = {
  tasksCompleted: 32,
};

export const mockTiers = [
  { name: "Starter", threshold: 0 },
  { name: "Active", threshold: 5 },
  { name: "Pro", threshold: 20 },
  { name: "Expert", threshold: 50 },
  { name: "Elite", threshold: 100 },
] as const;

export type MockTier = (typeof mockTiers)[number];
export type MockLevelProgress = typeof mockLevelProgress;

/**
 * Referral program data.
 * TODO (real version): link, stats, referral list and leaderboard all come
 * from the backend; commission is a % of what each referred user earns.
 */
export const mockReferral = {
  link: "t.me/taskether_bot?start=ref_84291056",
  commissionNote: "Get 7% commission on what your invites earn, for their first 30 days.",
  totalReferrals: "14",
  totalCommissionUsdt: "23.80",
};

export const mockMyReferrals = [
  { name: "Nadia_K", commissionUsdt: "4.20" },
  { name: "arif.codes", commissionUsdt: "3.50" },
  { name: "TaniaR99", commissionUsdt: "6.10" },
  { name: "shovo_x", commissionUsdt: "1.90" },
] as const;

export const mockTopReferrers = [
  { name: "Meherun_22", referrals: 89 },
  { name: "DevRafi", referrals: 76 },
  { name: "nusrat.k", referrals: 61 },
  { name: "Tanvir_M", referrals: 54 },
  { name: "proshanto", referrals: 47 },
  { name: "IqraB", referrals: 41 },
  { name: "Rakib_Vercel", referrals: 38 },
  { name: "sadia.dev", referrals: 33 },
  { name: "Hridoy44", referrals: 29 },
  { name: "NafisaK", referrals: 25 },
] as const;

export type MockReferral = typeof mockReferral;

