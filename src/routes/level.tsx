import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/level")({
  head: () => ({
    meta: [
      { title: "Level — TaskEther" },
      { name: "description", content: "Track your TaskEther level and unlock higher rewards." },
      { property: "og:title", content: "Level — TaskEther" },
      {
        property: "og:description",
        content: "Track your TaskEther level and unlock higher rewards.",
      },
    ],
  }),
  component: () => <Placeholder title="Level" />,
});
