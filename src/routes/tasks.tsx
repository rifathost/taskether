import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — TaskEther" },
      { name: "description", content: "Complete tasks and earn USDT rewards on TaskEther." },
      { property: "og:title", content: "Tasks — TaskEther" },
      {
        property: "og:description",
        content: "Complete tasks and earn USDT rewards on TaskEther.",
      },
    ],
  }),
  component: () => <Placeholder title="Tasks" />,
});
