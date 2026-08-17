"use server";

import { apiClient } from "./api-client";
import { getToken } from "./cookies";

export type UserResponse = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "USER" | "MODERATOR";
  createdAt: string;
  avatarUrl?: string | undefined;
  username: string;
};

export async function getUser(): Promise<UserResponse | null> {
  try {
    const token = await getToken();

    if (!token) {
      return null;
    }

    const user = await apiClient<UserResponse>("/api/me", {
      token,
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
