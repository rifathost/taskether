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
  tasksDone: "32",
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
  walletAddress: "TXy8bQ4nRz9kLmPqW3xVdF7gH2sJ4tYkF92mP",
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

/**
 * Transaction history entries.
 * TODO (real version): fetch from the backend; relative timestamps should be
 * computed server-side or formatted on the client from ISO dates.
 */
export type MockTransaction = {
  id: string;
  type: "task_reward" | "referral" | "p2p_received" | "p2p_sent" | "withdrawal";
  label: string;
  amount: number;
  time: string;
  status?: "Completed" | "Pending";
};

export const mockTransactions: MockTransaction[] = [
  {
    id: "1",
    type: "task_reward",
    label: "Join TaskEther Announcements",
    amount: 0.5,
    time: "2 hours ago",
  },
  {
    id: "2",
    type: "referral",
    label: "From Nadia_K",
    amount: 0.35,
    time: "5 hours ago",
  },
  {
    id: "3",
    type: "p2p_received",
    label: "From arif.codes",
    amount: 2.0,
    time: "1 day ago",
  },
  {
    id: "4",
    type: "task_reward",
    label: "Complete a Quick Survey",
    amount: 0.75,
    time: "1 day ago",
  },
  {
    id: "5",
    type: "p2p_sent",
    label: "To TaniaR99",
    amount: -5.0,
    time: "2 days ago",
  },
  {
    id: "6",
    type: "withdrawal",
    label: "To TRC20 wallet",
    amount: -18.0,
    status: "Completed",
    time: "3 days ago",
  },
  {
    id: "7",
    type: "task_reward",
    label: "Visit Partner Website",
    amount: 0.3,
    time: "4 days ago",
  },
  {
    id: "8",
    type: "withdrawal",
    label: "To TRC20 wallet",
    amount: -13.0,
    status: "Pending",
    time: "5 days ago",
  },
  {
    id: "9",
    type: "referral",
    label: "From shovo_x",
    amount: 0.2,
    time: "6 days ago",
  },
];


