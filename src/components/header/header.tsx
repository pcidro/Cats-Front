"use client";
import Link from "next/link";
import {
  Compass,
  Home,
  UserPlus,
  PawPrint,
  LogOut,
  UserRound,
  Plus,
} from "lucide-react";
import { usePathname } from "next/navigation";
import HeaderMobile from "./headermobile";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import { logoutAction } from "@/actions/user/logoutAction";

export default function Header() {
  const [OpenMenu, setOpenMenu] = useState(false);
  const pathname = usePathname();
  const { user } = useUser();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  const navigationItems = user
    ? [
        {
          href: "/explorar",
          label: "Explorar",
          icon: Compass,
        },
      ]
    : [
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

  async function handleLogout() {
    setOpenMenu(false);
    await logoutAction();
  }

  return (
    <>
      <div className="sticky top-0 z-40 hidden w-full border-b border-border/70 bg-white/90 backdrop-blur-md md:block">
        <header className="flex items-center justify-between mx-auto max-w-7xl px-4 py-1.5">
          <Link href={user ? "/explorar" : "/"}>
            <img
              className="h-16 w-auto"
              src="/img/logo/catalogo.png"
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

            {user ? (
              <li className="relative">
                <button
                  type="button"
                  onClick={() => setOpenMenu((open) => !open)}
                  className="rounded-full"
                  aria-expanded={OpenMenu}
                >
                  <img
                    className="size-11 cursor-pointer rounded-full object-cover ring-2 ring-primary/15 ring-offset-2 transition hover:ring-primary/40"
                    src={user.avatarUrl || "/img/gatos/nouser.jpg"}
                    alt={`Foto de ${user.name}`}
                  />
                </button>

                {OpenMenu && (
                  <div className="absolute right-0 top-[calc(100%+0.875rem)] z-50 w-64 overflow-hidden rounded-2xl border border-border/70 bg-white/95 p-2 shadow-[0_18px_45px_rgba(74,48,40,0.16)] ">
                    <div className="flex items-center gap-3 px-3 py-3">
                      <img
                        className="size-10 rounded-full object-cover"
                        src={user.avatarUrl || "/img/gatos/nouser.jpg"}
                      />

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <div className="my-1 h-px bg-border/70" />

                    <Link
                      href="/perfil"
                      onClick={() => setOpenMenu(false)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground  hover:bg-primary/10 hover:text-foreground"
                    >
                      <UserRound
                        size={18}
                        className="text-muted-foreground hover:text-primary"
                      />
                      Meu perfil
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <LogOut
                        size={18}
                        className="transition-colors group-hover:text-red-500"
                      />
                      Sair
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 rounded-full border-2 border-border px-5 py-2 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <PawPrint size={22} />
                    Entrar
                  </Link>
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
              </>
            )}
          </ul>
        </header>
      </div>
      <HeaderMobile />
    </>
  );
}
