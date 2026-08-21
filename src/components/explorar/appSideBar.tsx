"use client";

import { cn } from "@/lib/utils";
import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useUser } from "@/context/userContext";
import PostForm from "../postar/postForm";

export default function AppSidebar() {
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
        <PostForm />
        <Link
          href={`/profile/${user?.username}`}
          className={cn(
            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
            pathname === "/profile/human"
              ? "bg-secondary text-primary"
              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground",
          )}
        >
          {user?.avatarUrl ? (
            <img
              className="h-5 w-5 rounded-full object-cover"
              src={user.avatarUrl}
              alt="Foto do usuário"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
          Meu Perfil
        </Link>
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
