"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";

export default async function createCommentAction(formData: FormData) {
  const token = await getToken();

  try {
    if (!token) {
      return apiError("Token inválido");
    }

    const postId = formData.get("postId") as string;
    const content = (formData.get("content") as string)?.trim();

    if (!postId) {
      return apiError("Publicação não informada");
    }

    if (!content) {
      return apiError("Escreva um comentário");
    }

    const response = await apiClient(`/api/comment/${postId}`, {
      method: "POST",
      body: JSON.stringify({ content }),
      token,
    });

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    return apiError(error);
  }
}
