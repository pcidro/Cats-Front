"use server";

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";
import { getToken } from "@/utils/cookies";
import { revalidatePath } from "next/cache";

export async function toggleLikeAction(post_id: string) {
  const token = await getToken();

  try {
    if (!token) {
      return apiError("Token invalido");
    }

    const response = await apiClient(`/api/like/${post_id}`, {
      method: "POST",
      token,
    });

    revalidatePath("/explorar");

    return { data: response, ok: true, errors: { form: "" } };
  } catch (error) {
    console.log(error);
    return apiError(error);
  }
}
