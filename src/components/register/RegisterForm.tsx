import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
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

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
});

export default function RegisterForm() {
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

      <div className="mt-4 text-center sm:mt-5">
        <h1
          className={`${displayFont.className} text-[36px] font-bold leading-tight text-foreground sm:text-[40px]`}
        >
          Criar sua conta
        </h1>

        <p className="mx-auto mt-2 max-w-sm text-[14px] leading-5 text-muted-foreground">
          Junte-se à nossa comunidade felina e comece a compartilhar momentos
          incríveis com seu gatinho.
        </p>
      </div>

      <form className="mt-5 sm:mt-6">
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
              type="password"
              placeholder="Crie uma senha"
              className="h-11 w-full rounded-xl border border-border bg-surface pl-12 pr-12 text-[14px] text-foreground outline-none transition focus:ring-4 focus:ring-primary/10"
            />

            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition hover:text-primary"
            >
              <Eye className="size-5" />
            </button>
          </div>
        </div>

        <button
          type="button"
          className="mt-5 flex h-11 w-full items-center justify-center gap-3 rounded-xl bg-primary px-5 text-sm sm:text-base font-semibold text-primary-foreground transition hover:brightness-95 cursor-pointer"
        >
          <PawPrint className="size-5" />
          Criar conta
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
