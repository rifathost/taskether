import { createFileRoute } from "@tanstack/react-router";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/referral")({
  head: () => ({
    meta: [
      { title: "Referral — TaskEther" },
      { name: "description", content: "Invite friends to TaskEther and earn together." },
      { property: "og:title", content: "Referral — TaskEther" },
      { property: "og:description", content: "Invite friends to TaskEther and earn together." },
    ],
  }),
  component: () => <Placeholder title="Referral" />,
});
