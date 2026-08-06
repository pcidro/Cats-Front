"use server";
import { CommentType } from "@/types/commentType";
import { apiClient } from "@/utils/api-client";

export default async function getCommmentsByPost(
  postId: string,
): Promise<CommentType[]> {
  const coments = await apiClient<CommentType[]>(`/api/comments/${postId}`);
  return coments;
}
