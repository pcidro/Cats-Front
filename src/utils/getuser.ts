import { apiClient } from "./api-client";
import { getToken } from "./cookies";

export async function getUser() {
  try {
    const token = await getToken();

    if (!token) {
      return null;
    }

    const user = await apiClient("/api/me", {
      token,
    });
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
