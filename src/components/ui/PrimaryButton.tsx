import { ReactNode } from "react";

export default function PrimaryButton(children: ReactNode) {
  return (
    <div>
      <button className="rounded-xl px-5 py-3 font-bold text-primary-foreground transition hover:bg-primary-hover active:bg-primary-active disabled:pointer-events-none disabled:opacity-60">
        {children}
      </button>
    </div>
  );
}
