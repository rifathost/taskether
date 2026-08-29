import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/admin/tasks")({
  head: () => ({
    meta: [
      { title: "Tasks — TaskEther Admin" },
      { name: "description", content: "Create and manage the tasks users can complete." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Tasks — TaskEther Admin" },
      { property: "og:description", content: "Create and manage the tasks users can complete." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Placeholder title="Tasks" withBack backTo="/admin" />,
});
