"use server";
import { PostType } from "@/types/postType";
import { apiClient } from "@/utils/api-client";

export default async function photosGet(
  page = 1,
  limit = 6,
): Promise<PostType[]> {
  return apiClient<PostType[]>(`/api/posts?page=${page}&limit=${limit}`, {
    cache: "no-store",
  });
}
