"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Lock,
  Mail,
  PawPrint,
  User,
} from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RegisterAction from "@/actions/user/registerAction";
import CatsLoading from "../ui/loading";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(!showPassword);
  }

  const initialState = {
    ok: false,
    errors: {},
    data: null,
  };

  const [state, action, isPending] = useActionState(
    RegisterAction,
    initialState,
  );

  useEffect(() => {
    if (state.ok) {
      router.refresh();
      router.push("/explorar");
    }
  }, [state.ok, router]);

  return (
    <section className="w-full min-h-dvh flex flex-col justify-center p-6 mx-auto md:min-h-auto md:block md:max-w-107.5">
      <div className="flex justify-center">
        <Image
          src="/img/logo/catalogo.png"
          alt="Cats"
          width={190}
          height={100}
          priority
          className="h-auto w-36 object-contain sm:w-40"
        />
      </div>

      <div className="mt-4 text-center sm:mt-5">
        <h1 className="font-nunito text-[36px] font-bold leading-tight text-foreground sm:text-[40px]">
          Crie sua conta
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-5 text-muted-foreground">
          Junte-se a nossa comunidade felina e comece a compartilhar momentos
          incríveis com seu gatinho.
        </p>
      </div>

      <form action={action} className="mt-5 sm:mt-6">
        {/* Nome */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block text-sm font-semibold text-foreground"
          >
            Nome
          </label>

          <div className="relative">
            <User className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Seu nome completo"
              className="h-11 w-full rounded-xl border bg-surface pl-12 pr-4 text-[14px] text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
          {state.errors.name && (
            <p className="mt-1 text-sm text-red-500">{state.errors.name}</p>
          )}
        </div>

        {/* E-mail */}
        <div className="mt-3.5">
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-semibold text-foreground"
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
              className="h-11 w-full rounded-xl border bg-surface pl-12 pr-4 text-[14px] text-foreground outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/10"
            />
          </div>
          {state.errors.email && (
            <p className="mt-1 text-sm text-red-500">{state.errors.email}</p>
          )}
        </div>

        {/* Senha */}
        <div className="mt-3.5">
          <Label
            htmlFor="password"
            className="mb-1 block text-sm font-semibold text-foreground"
          >
            Senha
          </Label>

          <div className="relative">
            <Lock className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Crie uma senha"
              className="h-11 w-full rounded-xl border border-border bg-surface pl-12 pr-12 text-[14px] text-foreground outline-none transition focus:ring-4 focus:ring-primary/10"
            />

            <button
              type="button"
              onClick={togglePassword}
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
          disabled={isPending}
          className="mt-5 flex h-11 w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 text-sm sm:text-base font-semibold text-primary-foreground transition hover:brightness-95 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <CatsLoading className="w-8 h-auto text-primary-foreground" />
              <span>Criando conta...</span>
            </>
          ) : (
            <>
              <PawPrint className="size-5" />
              <span>Criar conta</span>
            </>
          )}
        </button>

        <div className="my-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">ou</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Link
          href="/login"
          className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-primary/45 bg-surface px-5 text-sm sm:text-base font-semibold text-primary transition hover:bg-secondary"
        >
          <ArrowLeft className="size-5" />
          Entrar com o google
        </Link>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-2 text-center text-sm text-foreground">
          Já tem uma conta?
          <Link
            href="/login"
            className="inline-flex items-center gap-2 font-semibold text-primary transition hover:brightness-90"
          >
            Entrar agora
            <ArrowRight className="size-4" />
          </Link>
        </p>
      </form>
    </section>
  );
}
