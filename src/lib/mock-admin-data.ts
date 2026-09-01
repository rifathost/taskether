/**
 * Mock data for the admin dashboard.
 * Same convention as src/lib/mock-data.ts — swap for real API calls later.
 */
export const mockAdminStats = {
  // TODO (real version): count submissions with status = 'pending'.
  // Kept in sync manually with mockSubmissions below (8 pending).
  pendingSubmissions: 8,
  // TODO (real version): count withdrawal requests with status = 'pending'.
  pendingWithdrawals: 4,
  // TODO (real version): total registered users from the users table.
  totalUsers: 1284,
  // TODO (real version): count tasks that are active and still have open slots.
  // Kept in sync manually with mockTasks below (3 active).
  activeTasks: 3,
};

export type MockAdminStats = typeof mockAdminStats;

export type TaskStatus = "draft" | "active" | "paused" | "completed" | "archived";

export type MockTask = {
  id: string;
  title: string;
  /** Free text — admins can invent new categories. */
  type: string;
  description: string;
  proofInstructions: string;
  rewardAmount: number;
  totalSlots: number;
  remainingSlots: number;
  status: TaskStatus;
  createdAt: string;
};

// TODO (real version): fetch from the tasks table, newest first.
export const mockTasks: MockTask[] = [
  {
    id: "t1",
    title: "Join our Telegram Channel",
    type: "Join Channel",
    description: "Join the official TaskEther announcements channel and stay subscribed.",
    proofInstructions:
      "Send the link to your join message in the channel, or your Telegram username.",
    rewardAmount: 1.5,
    totalSlots: 500,
    remainingSlots: 182,
    status: "active",
    createdAt: "2 weeks ago",
  },
  {
    id: "t2",
    title: "Visit Partner Website",
    type: "Visit Website",
    description: "Open our partner shop and browse for at least one minute.",
    proofInstructions:
      "Describe the promo banner text you saw on the landing page.",
    rewardAmount: 0.8,
    totalSlots: 300,
    remainingSlots: 97,
    status: "active",
    createdAt: "9 days ago",
  },
  {
    id: "t3",
    title: "Quick Product Survey",
    type: "Survey",
    description: "Answer 12 short questions about how you use TaskEther.",
    proofInstructions: "Paste the confirmation code shown at the end of the survey.",
    rewardAmount: 2.25,
    totalSlots: 200,
    remainingSlots: 41,
    status: "active",
    createdAt: "6 days ago",
  },
  {
    id: "t4",
    title: "Follow on X",
    type: "Custom",
    description: "Follow the TaskEther account on X and repost the pinned post.",
    proofInstructions: "Send the link to your repost.",
    rewardAmount: 1.0,
    totalSlots: 250,
    remainingSlots: 250,
    status: "draft",
    createdAt: "3 days ago",
  },
  {
    id: "t5",
    title: "Refer a Friend Challenge",
    type: "Referral Bonus",
    description: "Invite one friend who completes their first task this week.",
    proofInstructions: "Send your referral link and your friend's username.",
    rewardAmount: 3.0,
    totalSlots: 100,
    remainingSlots: 64,
    status: "paused",
    createdAt: "1 month ago",
  },
  {
    id: "t6",
    title: "Beta Feedback Form",
    type: "Survey",
    description: "Share your feedback on the new wallet screen.",
    proofInstructions: "Paste the submission ID from the feedback form.",
    rewardAmount: 1.75,
    totalSlots: 150,
    remainingSlots: 0,
    status: "completed",
    createdAt: "2 months ago",
  },
  {
    id: "t7",
    title: "Old Launch Giveaway",
    type: "Custom",
    description: "Legacy launch campaign, no longer available.",
    proofInstructions: "Send a screenshot of your giveaway entry.",
    rewardAmount: 0.5,
    totalSlots: 400,
    remainingSlots: 12,
    status: "archived",
    createdAt: "4 months ago",
  },
];


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
