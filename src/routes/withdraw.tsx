import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/withdraw")({
  head: () => ({
    meta: [
      { title: "Withdraw — TaskEther" },
      { name: "description", content: "Withdraw your USDT earnings over the TRC20 network." },
      { property: "og:title", content: "Withdraw — TaskEther" },
      {
        property: "og:description",
        content: "Withdraw your USDT earnings over the TRC20 network.",
      },
    ],
  }),
  component: () => <Placeholder title="Withdraw" withBack />,
});
