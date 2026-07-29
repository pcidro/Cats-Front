import { ReactNode } from "react";

export default function SecondaryButton(children: ReactNode) {
  return (
    <div>
      <button className="rounded-xl border border-border-strong bg-surface px-5 py-3 font-bold text-foreground transition hover:bg-surface-muted">
        {children}
      </button>
    </div>
  );
}
