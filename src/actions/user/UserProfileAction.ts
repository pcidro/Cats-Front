"use server";

interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
  cats: Cat[];
}

interface Cat {
  id: string;
  name: string;
  birthDate: string;
  bio: string;
  avatarUrl: string;
  createdAt: string;
}

import { apiClient } from "@/utils/api-client";
import apiError from "@/utils/api-error";

export default async function userProfileAction(username: string) {
  try {
    if (!username) {
      return apiError("Informe um username");
    }

    const user: User = await apiClient(`/api/users/profile/${username}`);

    return { data: user, ok: true, errors: { form: "" } };
  } catch (error) {
    return apiError(error);
  }
}
