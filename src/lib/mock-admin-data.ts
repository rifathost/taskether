/**
 * Mock data for the admin dashboard.
 * Same convention as src/lib/mock-data.ts — swap for real API calls later.
 */
export const mockAdminStats = {
  // TODO (real version): count submissions with status = 'pending'.
  // Kept in sync manually with mockSubmissions below (8 pending).
  pendingSubmissions: 8,
  // TODO (real version): count withdrawal requests with status = 'pending'.
  pendingWithdrawals: 3,
  // TODO (real version): total registered users from the users table.
  totalUsers: 1284,
  // TODO (real version): count tasks that are active and still have open slots.
  activeTasks: 4,
};

export type MockAdminStats = typeof mockAdminStats;

export type SubmissionStatus = "pending" | "approved" | "rejected";

export type MockSubmission = {
  id: string;
  taskTitle: string;
  /** Matches the four task types in src/lib/mock-data.ts */
  taskType: "Join Channel" | "Visit Website" | "Survey" | "Custom";
  username: string;
  rewardAmount: number;
  proofType: "link" | "text";
  proofContent: string;
  status: SubmissionStatus;
  rejectionReason?: string;
  submittedAt: string;
};

// TODO (real version): fetch from the submissions table, newest first.
export const mockSubmissions: MockSubmission[] = [
  {
    id: "s1",
    taskTitle: "Join our Telegram Channel",
    taskType: "Join Channel",
    username: "Nadia_K",
    rewardAmount: 1.5,
    proofType: "link",
    proofContent: "https://t.me/taskether_announcements/142",
    status: "pending",
    submittedAt: "12 min ago",
  },
  {
    id: "s2",
    taskTitle: "Visit Partner Website",
    taskType: "Visit Website",
    username: "arif.codes",
    rewardAmount: 0.8,
    proofType: "text",
    proofContent:
      "Opened the landing page and stayed for about two minutes. The promo banner said '30% off first order' and the footer listed a Dhaka office address.",
    status: "pending",
    submittedAt: "34 min ago",
  },
  {
    id: "s3",
    taskTitle: "Quick Product Survey",
    taskType: "Survey",
    username: "TaniaR99",
    rewardAmount: 2.25,
    proofType: "link",
    proofContent: "https://forms.gle/9aTk2QpVv3XmR7Zc8",
    status: "pending",
    submittedAt: "1 hr ago",
  },
  {
    id: "s4",
    taskTitle: "Follow on X",
    taskType: "Custom",
    username: "shovo_x",
    rewardAmount: 1.0,
    proofType: "link",
    proofContent: "https://x.com/shovo_x/status/1793845127338",
    status: "pending",
    submittedAt: "2 hrs ago",
  },
  {
    id: "s5",
    taskTitle: "Join our Telegram Channel",
    taskType: "Join Channel",
    username: "rifat.dev",
    rewardAmount: 1.5,
    proofType: "text",
    proofContent:
      "Joined with the username @rifat_dev. My join message is the last one in the channel chat.",
    status: "pending",
    submittedAt: "3 hrs ago",
  },
  {
    id: "s6",
    taskTitle: "Quick Product Survey",
    taskType: "Survey",
    username: "meherun.a",
    rewardAmount: 2.25,
    proofType: "text",
    proofContent:
      "Finished all 12 questions. Confirmation code shown at the end was SRV-4471-KQ.",
    status: "pending",
    submittedAt: "5 hrs ago",
  },
  {
    id: "s7",
    taskTitle: "Visit Partner Website",
    taskType: "Visit Website",
    username: "jubayer_h",
    rewardAmount: 0.8,
    proofType: "link",
    proofContent: "https://partner-shop.example.com/?ref=taskether_jubayer",
    status: "pending",
    submittedAt: "8 hrs ago",
  },
  {
    id: "s8",
    taskTitle: "Follow on X",
    taskType: "Custom",
    username: "Sadia.Islam",
    rewardAmount: 1.0,
    proofType: "link",
    proofContent: "https://x.com/SadiaIslam/status/1793440021975",
    status: "pending",
    submittedAt: "11 hrs ago",
  },
  {
    id: "s9",
    taskTitle: "Join our Telegram Channel",
    taskType: "Join Channel",
    username: "hasib_99",
    rewardAmount: 1.5,
    proofType: "link",
    proofContent: "https://t.me/taskether_announcements/128",
    status: "approved",
    submittedAt: "Yesterday",
  },
  {
    id: "s10",
    taskTitle: "Quick Product Survey",
    taskType: "Survey",
    username: "Nusrat_J",
    rewardAmount: 2.25,
    proofType: "text",
    proofContent:
      "Completed the survey twice by mistake, the second confirmation code is SRV-2210-AB.",
    status: "approved",
    submittedAt: "Yesterday",
  },
  {
    id: "s11",
    taskTitle: "Visit Partner Website",
    taskType: "Visit Website",
    username: "fahim.ah",
    rewardAmount: 0.8,
    proofType: "link",
    proofContent: "https://example.com",
    status: "rejected",
    rejectionReason: "Proof link points to a generic page, not the partner site.",
    submittedAt: "2 days ago",
  },
  {
    id: "s12",
    taskTitle: "Follow on X",
    taskType: "Custom",
    username: "tomal_r",
    rewardAmount: 1.0,
    proofType: "text",
    proofContent: "done",
    status: "rejected",
    rejectionReason: "No verifiable proof provided — please include your profile link.",
    submittedAt: "3 days ago",
  },
];
