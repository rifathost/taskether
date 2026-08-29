import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/admin/submissions")({
  head: () => ({
    meta: [
      { title: "Submissions — TaskEther Admin" },
      { name: "description", content: "Review task proof submissions from users." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Submissions — TaskEther Admin" },
      { property: "og:description", content: "Review task proof submissions from users." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <Placeholder title="Submissions" withBack backTo="/admin" />,
});
