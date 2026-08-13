"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Home, LogIn, UserPlus, LogOut, Plus } from "lucide-react";
import { useUser } from "@/context/userContext";
import { logoutAction } from "@/actions/user/logoutAction";
import PostForm from "../postar/postForm";

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

export default function HeaderMobile() {
  const pathname = usePathname();
  const { user } = useUser();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  }

  async function handleLogout() {
    await logoutAction();
  }

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] md:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-5 items-center">
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

        {user ? (
          <>
            <li className="flex min-h-16 flex-col items-center justify-center gap-1  text-xs font-medium">
              <PostForm>
                <button className="cursor-pointer rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:brightness-110 hover:shadow-lg active:scale-95">
                  <Plus className="size-4" strokeWidth={2.5} />
                </button>
              </PostForm>
            </li>
            <li>
              <Link
                href="/profile"
                className={`flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium ${
                  isActive("/profile")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <img
                  className={`w-6 h-6 rounded-full object-cover ${
                    isActive("/profile") ? "ring-2 ring-primary" : ""
                  }`}
                  src={
                    user.avatarUrl ? user.avatarUrl : "/img/gatos/nouser.jpg"
                  }
                  alt="Perfil"
                />
                Perfil
              </Link>
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="flex w-full min-h-16 flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <LogOut size={22} />
                Sair
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                href="/login"
                className={`flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium ${
                  isActive("/login")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LogIn size={22} />
                Entrar
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className={`flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-2 text-xs font-medium ${
                  isActive("/register")
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <UserPlus size={22} />
                Criar
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
