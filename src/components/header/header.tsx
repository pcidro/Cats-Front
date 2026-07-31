"use client";
import Link from "next/link";
import { Compass, Home, UserPlus, PawPrint, LogOut } from "lucide-react";
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
    await logoutAction();
  }

  return (
    <>
      <div className="hidden w-full border-b border-border bg-white md:block">
        <header className="flex items-center justify-between mx-auto max-w-7xl px-4 py-3">
          <Link href={user ? "/explorar" : "/"}>
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

            {user ? (
              <div className="relative">
                <li onClick={() => setOpenMenu(!OpenMenu)}>
                  <img
                    className="w-12 h-12 rounded-full object-cover cursor-pointer"
                    src={user.avatarUrl ? user.avatarUrl : "/img/nouser.jpg"}
                    alt=""
                  />
                </li>

                {OpenMenu && (
                  <ul className="absolute top-full mt-4 right-0 z-50 w-48 rounded-xl border border-border bg-white p-2 shadow-lg flex flew-col flex-col gap-2.5">
                    <li>
                      <Link
                        href="/login"
                        className="flex items-center gap-2 rounded-full border-2 border-border px-5 py-2 font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        <UserPlus size={22} />
                        Meu perfil
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors w-full cursor-pointer"
                      >
                        <LogOut size={18} />
                        Sair
                      </button>
                    </li>
                  </ul>
                )}
              </div>
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
