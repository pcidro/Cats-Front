"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken, removeToken } from "@/utils/cookies";

export default async function deleteUserAction() {
  const token = await getToken();

  try {
    if (!token) {
      return apiError("Token inválido");
    }

    const response = await apiClient("/api/users/delete", {
      method: "DELETE",
      token,
    });

    await removeToken();

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    return apiError(error);
  }
}
