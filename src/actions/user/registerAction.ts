"use server";
import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { setToken } from "@/utils/cookies";

type stateProps = {
  ok: boolean;
  error: string;
  data: AuthResponse | null;
};

export default async function RegisterAction(
  state: stateProps,
  formData: FormData,
) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password || !name) {
      throw new Error("Preencha os dados");
    }

    await apiClient("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });

    const authResponse = await apiClient<AuthResponse>("/api/auth", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    await setToken(authResponse.token);

    return { data: authResponse, ok: true, error: "" };
  } catch (error: unknown) {
    return apiError(error);
  }
}
