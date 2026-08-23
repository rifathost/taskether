import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — TaskEther" },
      { name: "description", content: "Manage your TaskEther account and wallet settings." },
      { property: "og:title", content: "Profile — TaskEther" },
      {
        property: "og:description",
        content: "Manage your TaskEther account and wallet settings.",
      },
    ],
  }),
  component: () => <Placeholder title="Profile" />,
});
