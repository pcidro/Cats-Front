"use client";

import { cn } from "@/lib/utils";
import { LogOut, Plus, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useUser } from "@/context/userContext";

export default function AppSidebar() {
  const menuItems = [
    {
      title: "Postar",
      href: "/postar",
      icon: Plus,
    },
    {
      title: "Meu Perfil",
      href: "/profile/human",
      icon: User,
    },
  ];

  const pathname = usePathname();
  const { user } = useUser();

  return (
    <aside className="fixed top-[76px] left-0 z-30 hidden h-[calc(100vh-76px)] w-64 flex-col border-r border-border bg-surface md:flex">
      <header className="border-b border-border px-6 py-6">
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">Olá,</p>

          <h2 className="mt-0.5 truncate text-lg font-semibold text-foreground">
            {user?.name}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Bem-vindo ao Cats 🐾
          </p>
        </div>
      </header>

      <nav className="flex-1 space-y-2 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground group-hover:text-primary",
                )}
              >
                {item.title === "Postar" ? (
                  <Icon className="h-5 w-5" />
                ) : user?.avatarUrl ? (
                  <img
                    className="h-full w-full rounded-full object-cover"
                    src={user.avatarUrl}
                    alt="Foto do usuário"
                  />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </span>

              {item.title}
            </Link>
          );
        })}
      </nav>

      <footer className="border-t border-border p-4">
        <form>
          <Button
            type="submit"
            variant="ghost"
            className="h-11 w-full justify-start gap-3 rounded-xl px-4 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            Sair
          </Button>
        </form>
      </footer>
    </aside>
  );
}
