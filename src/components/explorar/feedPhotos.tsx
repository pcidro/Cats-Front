"use client";
import { PostType } from "@/types/postType";
import { PawPrint } from "lucide-react";
import Container from "../ui/container";
import { useState } from "react";
import DeletePostDialog from "../dialogs/deletePostDialog";
import EditPostDialog from "../dialogs/editPostDIalog";
import DeleteCommentDialog from "../dialogs/deleteCommentDialog";
import EditCommentDialog from "../dialogs/EditCommentDialog";
import PostCard from "./postCard";

interface feedPhotosProps {
  posts: PostType[];
}

export default function FeedPhotos({ posts }: feedPhotosProps) {
  const [postDeleteId, setPostDeleteId] = useState<string | null>(null);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [commentDeleteId, setCommentDeleteId] = useState<string | null>(null);

  return (
    <div className="bg-[url('/img/background/auth-background.png')] bg-cover bg-center bg-fixed min-h-screen w-full">
      <Container>
        <div className="relative flex flex-col items-center gap-1 mb-8">
          <div className="flex items-center gap-2">
            <PawPrint
              className="size-6 text-primary opacity-70"
              strokeWidth={2}
            />
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary via-primary/80 to-primary/50 bg-clip-text text-transparent mt-7">
              Feed
            </h1>
            <PawPrint
              className="size-6 text-primary opacity-70 scale-x-[-1]"
              strokeWidth={2}
            />
          </div>
          <div className="h-1 w-16 rounded-full bg-linear-to-r from-primary/40 via-primary to-primary/40" />
        </div>

        <ul className="mx-auto flex w-full max-w-2xl flex-col gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onEditPost={(id) => setEditPostId(id)}
              onDeletePost={(id) => setPostDeleteId(id)}
              onEditComment={(id) => setEditCommentId(id)}
              onDeleteComment={(id) => setCommentDeleteId(id)}
            />
          ))}
        </ul>
      </Container>
      <DeletePostDialog
        postToDeleteId={postDeleteId}
        setPostDeleteId={setPostDeleteId}
      />
      <EditPostDialog postToEditId={editPostId} setPostEditId={setEditPostId} />

      <DeleteCommentDialog
        CommentToDeleteId={commentDeleteId}
        setCommentToDeleteId={setCommentDeleteId}
      />
      <EditCommentDialog
        commentToEditId={editCommentId}
        setCommentEditId={setEditCommentId}
      />
    </div>
  );
}
