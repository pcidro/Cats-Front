"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";

export async function EditPostAction(formData: FormData) {
  const token = await getToken();
  const caption = formData.get("caption") as string;
  const postId = formData.get("postToEditId") as string;

  try {
    if (!token) {
      return apiError("Token invalido");
    }

    if (!caption) {
      return apiError("Informe uma nova descrição");
    }

    const response = await apiClient(`/api/post/${postId}`, {
      method: "PUT",
      body: JSON.stringify({ caption }),
      token,
    });

    console.log(response);

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    console.log(error);
    return apiError(error);
  }
}
