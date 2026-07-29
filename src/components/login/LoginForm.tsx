"use client";

import { useActionState } from "react";
import { Label } from "../ui/label";
import LoginAction from "@/app/actions/loginAction";

export default function LoginForm() {
  const initialState = {
    ok: false,
    error: "",
    data: null,
  };
  const [state, action] = useActionState(LoginAction, initialState);
  return (
    <div className="flex w-full items-center justify-center px-6 lg:w-1/2">
      <form className="w-full max-w-md">
        <h1 className="text-3xl font-bold">
          Bem-vindo de volta ao <span>Cats</span>
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Entre com seus dados para acessar sua conta!
        </p>

        <div className="mt-8">
          <Label htmlFor="email">E-mail</Label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Digite seu e-mail"
            className="mt-2 w-full rounded-lg border px-4 py-3"
          />
        </div>

        <div className="mt-5">
          <Label htmlFor="password">Senha</Label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Digite sua senha"
            className="mt-2 w-full rounded-lg border px-4 py-3"
          />
        </div>

        <button
          type="submit"
          className="mt-8 w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
