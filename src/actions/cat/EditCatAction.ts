"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";

export async function EditCatAction(catId: string, formData: FormData) {
  const token = await getToken();

  try {
    if (!token) {
      return apiError("Token inválido");
    }

    const name = formData.get("name") as string;
    const birthDate = formData.get("birthDate") as string;
    const username = formData.get("username") as string;

    if (!name || name.trim().length < 2) {
      return apiError("O nome deve ter pelo menos 2 caracteres");
    }

    if (!birthDate || birthDate.trim() === "") {
      return apiError("A data de nascimento é obrigatória");
    }

    if (!username || username.trim().length < 3) {
      return apiError("O username deve ter pelo menos 3 caracteres");
    }

    const avatarUrl = formData.get("avatarUrl") as File | null;
    if (!avatarUrl || avatarUrl.size === 0 || avatarUrl.name === "undefined") {
      formData.delete("avatarUrl");
    }

    const response = await apiClient(`/api/cat/${catId}`, {
      method: "PUT",
      body: formData,
      token,
    });

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    console.error("Erro ao editar o gato:", error);
    return apiError(error);
  }
}
