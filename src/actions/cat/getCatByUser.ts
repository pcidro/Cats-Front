"use server";

import { apiClient } from "@/utils/api-client";
import { getToken } from "@/utils/cookies";
import { CatType } from "@/types/catType";

export async function getUserCatsAction(): Promise<CatType[]> {
  try {
    const token = await getToken();
    if (!token) return [];

    const cats = await apiClient<CatType[]>("/api/cats/me", { token });
    return cats;
  } catch (error) {
    console.error("Erro ao buscar gatos do usuário:", error);
    return [];
  }
}
