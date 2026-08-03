"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Lock,
  Mail,
  PawPrint,
  UsersRound,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginAction from "@/actions/user/loginAction";

export default function LoginForm() {
  const router = useRouter();
  const initialState = {
    ok: false,
    errors: {},
    data: null,
  };
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordShow() {
    setShowPassword(!showPassword);
  }

  const [state, action] = useActionState(LoginAction, initialState);

  useEffect(() => {
    if (state.ok) {
      router.refresh();
      router.push("/explorar");
    }
  }, [state.ok, router]);

  return (
    <section className="w-full max-w-107.5">
      <div className="flex justify-center">
        <Image
          src="/img/catalogo.png"
          alt="Cats"
          width={190}
          height={100}
          priority
          className="h-auto w-36 object-contain sm:w-40"
        />
      </div>

      <div className="mt-1 text-center sm:mt-5">
        <h1 className="font-nunito text-[36px] font-bold leading-tight text-foreground sm:text-[40px]">
          Entre na sua conta
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-[14px]  text-muted-foreground">
          Que bom te ver por aqui! Faça login para continuar compartilhando amor
          e histórias felinas.
        </p>
      </div>

      <form action={action} className="mt-6 sm:mt-7">
        <div>
          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-semibold text-foreground"
          >
            E-mail
          </label>

          <div className="relative">
            <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              className="h-12 w-full rounded-xl border border-border bg-surface pl-12 pr-12 text-[15px] text-foreground outline-none transition focus:ring-4 focus:ring-primary/10"
            />
          </div>
          {state.errors.email && (
            <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>

        <div className="mt-4">
          <Label
            htmlFor="password"
            className="mb-1.5 block text-sm font-semibold text-foreground"
          >
            Senha
          </Label>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Digite sua senha"
              className="h-12 w-full rounded-xl border border-border bg-surface pl-12 pr-12 text-[15px] text-foreground outline-none transition focus:ring-4 focus:ring-primary/10"
            />

            <button
              onClick={togglePasswordShow}
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-primary cursor-pointer"
            >
              <Eye className="size-5" />
            </button>
          </div>
          {state.errors.password && (
            <p className="mt-1 text-sm text-red-500">{state.errors.password}</p>
          )}
        </div>

        {state.errors.form && (
          <p className="mt-3 text-sm font-medium text-red-500 text-center">
            {state.errors.form}
          </p>
        )}

        <button
          type="submit"
          className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 text-base font-semibold text-primary-foreground transition hover:brightness-95 cursor-pointer"
        >
          <PawPrint className="size-5" />
          Entrar na conta
        </button>

        <div className="my-5 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">ou</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Link
          href="/explorar"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-primary/45 bg-surface px-5 text-base font-semibold text-primary transition hover:bg-secondary"
        >
          <UsersRound className="size-5" />
          Explorar a comunidade
        </Link>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-foreground">
          Ainda não tem conta?
          <Link
            href="/register"
            className="inline-flex items-center gap-2 font-semibold text-primary transition hover:brightness-90"
          >
            Criar conta
            <ArrowRight className="size-4" />
          </Link>
        </p>
      </form>
    </section>
  );
}
