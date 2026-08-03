"use server";
import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { setToken } from "@/utils/cookies";

export type LoginStateProps = {
  ok: boolean;
  errors: {
    email?: string;
    password?: string;
    form?: string;
  };
  data: AuthResponse | null;
};

export default async function LoginAction(
  state: LoginStateProps,
  formData: FormData,
): Promise<LoginStateProps> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const errors: LoginStateProps["errors"] = {};
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
    const response = await apiClient<AuthResponse>("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    await setToken(response.token);

    return { data: response, ok: true, errors: {} };
  } catch (error: unknown) {
    return apiError(error);
  }
}
