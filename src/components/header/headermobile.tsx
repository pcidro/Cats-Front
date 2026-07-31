"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, LogIn, UserPlus } from "lucide-react";

const navigationItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/explorar",
    label: "Explorar",
    icon: Compass,
  },
  {
    href: "/login",
    label: "Entrar",
    icon: LogIn,
  },
  {
    href: "/register",
    label: "Criar",
    icon: UserPlus,
  },
];

export default function HeaderMobile() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom) md:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-4">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium ${
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={22} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
