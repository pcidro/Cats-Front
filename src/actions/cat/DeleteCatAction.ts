"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";

export async function DeleteCatAction(catId: string) {
  const token = await getToken();

  try {
    if (!token) {
      return apiError("Token inválido");
    }

    const response = await apiClient(`/api/cat/${catId}`, {
      method: "DELETE",
      token,
    });

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    return apiError(error);
  }
}
