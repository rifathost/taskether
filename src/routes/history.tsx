import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "History — TaskEther" },
      { name: "description", content: "Review your TaskEther earnings and payout history." },
      { property: "og:title", content: "History — TaskEther" },
      {
        property: "og:description",
        content: "Review your TaskEther earnings and payout history.",
      },
    ],
  }),
  component: () => <Placeholder title="History" withBack />,
});
