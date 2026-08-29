import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export function Placeholder({
  title,
  description = "Coming soon",
  withBack = false,
  backTo = "/",
}: {
  title: string;
  description?: string;
  withBack?: boolean;
  backTo?: "/" | "/admin";
}) {
  return (
    <div className="flex min-h-screen flex-col px-5 pb-28 pt-6">
      <div className="flex items-center gap-3">
        {withBack ? (
          <Link
            to={backTo}
            aria-label="Back"
            className="grid h-11 w-11 place-items-center rounded-2xl bg-card shadow-soft"
          >
            <ArrowLeft size={20} className="text-foreground" />
          </Link>
        ) : null}
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="rounded-3xl bg-card px-8 py-10 text-center shadow-soft">
          <p className="text-base font-semibold text-foreground">{description}</p>
          <p className="mt-1 text-sm text-muted-foreground">We're building this screen.</p>
        </div>
      </div>
    </div>
  );
}
