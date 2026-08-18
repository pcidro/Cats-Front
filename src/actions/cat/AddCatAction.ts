"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";

export async function AddCatAction(formData: FormData) {
  const token = await getToken();

  try {
    if (!token) {
      return apiError("Token invalido");
    }

    const name = formData.get("name") as string;
    const birth_date = formData.get("birthDate") as string;
    const username = formData.get("username") as string;
    const bio = formData.get("bio") as string;
    const avatar_url = formData.get("avatarUrl") as File;

    if (!name) {
      return apiError("Escreva um nome");
    }

    if (!birth_date || !bio || !username) {
      return apiError("Preencha todos os campos");
    }

    if (!avatar_url) {
      return apiError("Coloque uma foto de perfil");
    }

    const response = await apiClient(`/api/cat`, {
      method: "POST",
      body: formData,
      token,
    });

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    return apiError(error);
  }
}
