import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/admin/withdrawals")({
  head: () => ({
    meta: [
      { title: "Withdrawals — TaskEther Admin" },
      { name: "description", content: "Process pending USDT withdrawal requests." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Withdrawals — TaskEther Admin" },
      { property: "og:description", content: "Process pending USDT withdrawal requests." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Placeholder title="Withdrawals" withBack backTo="/admin" />,
});
