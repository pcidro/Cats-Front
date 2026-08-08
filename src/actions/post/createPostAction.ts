"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";

export async function createPostAction(formData: FormData) {
  const token = await getToken();

  try {
    if (!token) {
      return apiError("Token invalido");
    }

    const imageUrl = formData.get("imageUrl") as File;
    const caption = formData.get("caption") as string;
    const catId = formData.get("selectedCatId") as string;

    if (!catId) {
      return apiError("Informe o gato que será postado");
    }

    if (!imageUrl || !caption) {
      return apiError("Preencha todos os campos");
    }

    const response = await apiClient(`/api/post/${catId}`, {
      method: "POST",
      body: formData,
      token,
    });

    console.log(response);

    return { data: response, ok: true, errors: {} };
  } catch (error) {
    return apiError(error);
  }
}
