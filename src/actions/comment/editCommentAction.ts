"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";

export async function EditCommentAction(formData: FormData) {
  const token = await getToken();
  const content = (formData.get("content") as string)?.trim();
  const commentId = formData.get("commentToEditId") as string;

  try {
    if (!token) {
      return apiError("Token inválido");
    }

    if (!commentId) {
      return apiError("Comentário não informado");
    }

    if (!content) {
      return apiError("Informe o novo conteúdo do comentário");
    }

    const response = await apiClient(`/api/comment/${commentId}`, {
      method: "PUT",
      body: JSON.stringify({ content }),
      token,
    });

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    console.log(error);
    return apiError(error);
  }
}
