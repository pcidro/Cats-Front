"use client";
import Link from "next/link";
import { Compass, Home, LogIn, UserPlus, PawPrint } from "lucide-react";
import { usePathname } from "next/navigation";
import Headermobile from "./headermobile";
import HeaderMobile from "./headermobile";

export default function Header() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

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
  ];

  return (
    <>
      <div className="hidden w-full border-b border-border bg-white md:block">
        <header className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3">
          <Link href="/">
            <img
              className="h-12 w-auto"
              src="/img/catalogo.png"
              alt="Logo cats"
            />
          </Link>
          <ul className="flex items-center gap-6">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-2 rounded-full px-4 py-2 font-medium transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon size={20} />
                    {item.label}
                  </Link>
                </li>
              );
            })}

            <li className="rounded-full border-2 border-border px-5 py-2 flex items-center gap-2 text-muted-foreground hover:bg-muted hover:text-foreground">
              <PawPrint size={22} />
              <Link href="/login">Entrar</Link>
            </li>
            <li>
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-full bg-primary px-5 py-2 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                <UserPlus size={22} />
                Criar conta
              </Link>
            </li>
          </ul>
        </header>
      </div>
      <HeaderMobile />
    </>
  );
}
