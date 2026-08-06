"use server";
import { PostType } from "@/types/postType";
import { apiClient } from "@/utils/api-client";

export default async function photosGet(): Promise<PostType[]> {
  const posts = await apiClient<PostType[]>("/api/posts");
  return posts;
}
