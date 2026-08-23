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
