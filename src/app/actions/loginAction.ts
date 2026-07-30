"use server";
import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { setToken } from "@/utils/cookies";

type stateProps = {
  ok: boolean;
  error: string;
  data: AuthResponse | null;
};

export default async function LoginAction(
  state: stateProps,
  formData: FormData,
) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      throw new Error("Preencha os dados");
    }

    const response = await apiClient<AuthResponse>("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    await setToken(response.token);

    return { data: response, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
