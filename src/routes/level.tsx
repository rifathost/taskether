import { createFileRoute } from "@tanstack/react-router";
import { Check, Lock, Star } from "lucide-react";
import { mockLevelProgress, mockTiers } from "@/lib/mock-data";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LevelPage,
});

function LevelPage() {
  const { tasksCompleted } = mockLevelProgress;

  const currentTierIndex = mockTiers.reduce(
    (selected, tier, index) => (tasksCompleted >= tier.threshold ? index : selected),
    0,
  );
  const currentTier = mockTiers[currentTierIndex]!;
  const nextTier = mockTiers[currentTierIndex + 1];

  const progressToNext = nextTier
    ? Math.min(100, Math.round((tasksCompleted / nextTier.threshold) * 100))
    : 100;

  return (
    <div className="mx-auto min-h-screen w-full max-w-md pb-28">
      <header className="page-px pt-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Level</h1>
        <p className="mt-1 text-sm font-medium text-muted-foreground">
          Purely merit-based — no shortcuts.
        </p>
      </header>

      <main className="mt-5 space-y-6 page-px">
        {/* Hero status card */}
        <section className="rounded-3xl bg-gradient-primary p-6 shadow-hero">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary-foreground/15 text-primary-foreground">
              <Star size={28} fill="currentColor" />
            </span>
            <div>
              <p className="text-sm font-semibold text-primary-foreground/80">Current tier</p>
              <p className="text-4xl font-bold tracking-tight text-primary-foreground">
                {currentTier.name}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <div className="h-3 w-full overflow-hidden rounded-full bg-primary-foreground/20">
              <div
                className="h-full rounded-full bg-primary-foreground transition-all"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <p className="mt-3 text-sm font-semibold text-primary-foreground/90">
              {tasksCompleted} / {nextTier?.threshold ?? tasksCompleted} tasks to{" "}
              {nextTier?.name ?? "Max"}
            </p>
          </div>
        </section>

        {/* Tier roadmap */}
        <section>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Tier Roadmap</h2>
          <div className="mt-3 space-y-3">
            {mockTiers.map((tier, index) => {
              const isCompleted = index < currentTierIndex;
              const isCurrent = index === currentTierIndex;
              const isLocked = index > currentTierIndex;

              return (
                <div
                  key={tier.name}
                  className={`flex items-center gap-4 rounded-3xl p-4 shadow-card ${
                    isCurrent
                      ? "bg-gradient-primary text-primary-foreground"
                      : "bg-card text-foreground"
                  } ${isLocked ? "opacity-50" : ""}`}
                >
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
                      isCurrent
                        ? "bg-primary-foreground/15 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {isLocked ? (
                      <Lock size={20} />
                    ) : isCurrent ? (
                      <Star size={20} fill="currentColor" />
                    ) : (
                      <Check size={20} />
                    )}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-base font-bold ${
                        isCurrent
                          ? "text-primary-foreground"
                          : isLocked
                            ? "text-muted-foreground"
                            : "text-foreground"
                      }`}
                    >
                      {tier.name}
                    </p>
                    <p
                      className={`text-xs font-medium ${
                        isCurrent ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      {tier.threshold} tasks
                    </p>
                  </div>

                  <div className="shrink-0">
                    {isCurrent ? (
                      <span className="rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Current
                      </span>
                    ) : isCompleted ? (
                      <Check size={22} className="text-muted-foreground" />
                    ) : (
                      <Lock size={22} className="text-muted-foreground" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
