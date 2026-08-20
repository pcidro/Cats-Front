"use server";
import { PostType } from "@/types/postType";
import { apiClient } from "@/utils/api-client";

export default async function getPostById(id: string): Promise<PostType> {
  return apiClient<PostType>(`/api/post/${id}`, {
    cache: "no-store",
  });
}
