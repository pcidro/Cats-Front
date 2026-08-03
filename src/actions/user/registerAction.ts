"use server";
import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { setToken } from "@/utils/cookies";

export type RegisterStateProps = {
  ok: boolean;
  errors: {
    name?: string;
    email?: string;
    password?: string;
    form?: string;
  };
  data: AuthResponse | null;
};

export default async function RegisterAction(
  state: RegisterStateProps,
  formData: FormData,
): Promise<RegisterStateProps> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const errors: RegisterStateProps["errors"] = {};

  if (!name) {
    errors.name = "Nome é necessário.";
  }

  if (!email) {
    errors.email = "Email é necessário.";
  }

  if (!password) {
    errors.password = "Senha é necessária.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      ok: false,
      data: null,
      errors,
    };
  }

  try {
    await apiClient("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const authResponse = await apiClient<AuthResponse>("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    await setToken(authResponse.token);

    return { data: authResponse, ok: true, errors: {} };
  } catch (error: unknown) {
    return apiError(error);
  }
}

