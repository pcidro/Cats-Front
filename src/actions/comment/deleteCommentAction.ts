"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";

export async function DeleteCommentAction(CommentId: string | null) {
  const token = await getToken();

  try {
    if (!token) {
      return apiError("Token invalido");
    }

    const response = await apiClient(`/api/comment/${CommentId}`, {
      method: "DELETE",
      token,
    });

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    console.log(error);
    return apiError(error);
  }
}
