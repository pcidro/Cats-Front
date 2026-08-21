"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";

export async function EditUserAction(formData: FormData) {
  const token = await getToken();
  const username = formData.get("username") as string;
  const avatarUrl = formData.get("avatarUrl") as File | null;

  try {
    console.log("Campos do FormData:", Object.fromEntries(formData.entries()));
    if (!token) {
      return apiError("Token invalido");
    }

    if (!avatarUrl || avatarUrl.size === 0 || avatarUrl.name === "undefined") {
      formData.delete("avatarUrl");
    }

    if (!username || !avatarUrl) {
      return apiError("Não foi identificada nenhuma alteração");
    }

    const response = await apiClient("/api/users/update", {
      method: "PUT",
      body: formData,
      token,
    });

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    console.log(error);
    return apiError(error);
  }
}
