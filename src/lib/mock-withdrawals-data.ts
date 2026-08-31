/**
 * Mock withdrawal requests for the admin queue.
 * Same convention as src/lib/mock-admin-data.ts — swap for real API calls later.
 */
export type WithdrawalStatus = "pending" | "completed" | "cancelled";

export type MockWithdrawal = {
  id: string;
  username: string;
  /** Amount the user requested, before fee. */
  amount: number;
  /** Platform fee (10% of amount). */
  fee: number;
  /** What actually gets sent on-chain. */
  netPayout: number;
  walletAddress: string;
  status: WithdrawalStatus;
  /** Present only once a payout has been marked completed. */
  txHash?: string;
  cancelReason?: string;
  requestedAt: string;
};

const withFees = (
  base: Omit<MockWithdrawal, "fee" | "netPayout">,
): MockWithdrawal => ({
  ...base,
  fee: Number((base.amount * 0.1).toFixed(2)),
  netPayout: Number((base.amount * 0.9).toFixed(2)),
});

// TODO (real version): fetch from the withdrawals table, newest first.
export const mockWithdrawals: MockWithdrawal[] = [
  withFees({
    id: "w1",
    username: "Nadia_K",
    amount: 25,
    walletAddress: "TQ7fN2kLpX9wVbR4mJ8sYc3HdA6tZuE1qK",
    status: "pending",
    requestedAt: "18 min ago",
  }),
  withFees({
    id: "w2",
    username: "arif.codes",
    amount: 40,
    walletAddress: "TXy8bQ4nRz9kLmPqW3xVdF7gH2sJ4tYkF9",
    status: "pending",
    requestedAt: "1 hr ago",
  }),
  withFees({
    id: "w3",
    username: "TaniaR99",
    amount: 12.5,
    walletAddress: "TLm3cV7pB2xNq8dK5wZfA9rH4sJ6yU1tGe",
    status: "pending",
    requestedAt: "4 hrs ago",
  }),
  withFees({
    id: "w4",
    username: "shovo_x",
    amount: 60,
    walletAddress: "TRk9dW4mC1zP6bX3nQ8vY5hL2sF7jA0tUi",
    status: "pending",
    requestedAt: "9 hrs ago",
  }),
  withFees({
    id: "w5",
    username: "rifat.dev",
    amount: 18,
    walletAddress: "TBn5xK8qL3wM9cV2pZ7dR4tH6yJ1sA0fEo",
    status: "completed",
    txHash: "9f3c1a77b2e84d0c9a5b6e2f14d873ac05be91f7c2d43a8e60b17f95d2c48ae3",
    requestedAt: "Yesterday",
  }),
  withFees({
    id: "w6",
    username: "meherun.a",
    amount: 32,
    walletAddress: "TCq2vJ6nD8sX1pR5mW9zK3bY7hL4tG0fAu",
    status: "completed",
    txHash: "41ab77e0c5d92f6318b4ea70cd25f893a1607be4d3f82c95170ade6ب".slice(0, 64),
    requestedAt: "2 days ago",
  }),
  withFees({
    id: "w7",
    username: "jubayer_h",
    amount: 15,
    walletAddress: "TFd7sM2kQ9xW4bN6pV1zC8rY3hJ5tL0gAe",
    status: "completed",
    txHash: "b70e2c4915da836f0c71be5432ad9f68107c3e5db492a06f83c1de74a52b90cf",
    requestedAt: "3 days ago",
  }),
  withFees({
    id: "w8",
    username: "Sadia.Islam",
    amount: 22.5,
    walletAddress: "TGh4pR8wN3kS6xV9mB2zD7qY1cJ5tF0uLa",
    status: "cancelled",
    cancelReason: "Wallet address is not a valid TRC20 address.",
    requestedAt: "3 days ago",
  }),
  withFees({
    id: "w9",
    username: "tomal_r",
    amount: 50,
    walletAddress: "TJs6bY2mV8nX4kP7wR1zQ9dC3hL5tA0fGu",
    status: "cancelled",
    cancelReason: "Suspicious activity — account under review.",
    requestedAt: "5 days ago",
  }),
];
