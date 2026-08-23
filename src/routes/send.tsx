import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/send")({
  head: () => ({
    meta: [
      { title: "Send USDT — TaskEther" },
      { name: "description", content: "Send USDT from your TaskEther wallet." },
      { property: "og:title", content: "Send USDT — TaskEther" },
      { property: "og:description", content: "Send USDT from your TaskEther wallet." },
    ],
  }),
  component: () => <Placeholder title="Send" withBack />,
});
