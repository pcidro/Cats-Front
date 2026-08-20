"use client";

import { PostType } from "@/types/postType";
import formatTimeToPost from "@/utils/formattimetoPost";
import {
  Pencil,
  Trash2,
  PawPrint,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CommentsForm from "../comments/CommentsForm";
import { useUser } from "@/context/userContext";
import { startTransition, useOptimistic, useState } from "react";
import { toggleLikeAction } from "@/actions/like/toggleLikeAction";
import DeletePostDialog from "@/components/dialogs/deletePostDialog";
import EditPostDialog from "@/components/dialogs/editPostDIalog";
import DeleteCommentDialog from "@/components/dialogs/deleteCommentDialog";
import EditCommentDialog from "@/components/dialogs/EditCommentDialog";

interface EspecificPostProps {
  post: PostType;
}

export default function EspecificPost({ post }: EspecificPostProps) {
  const { user } = useUser();
  const [comment, setComment] = useState<string | null>("");
  const [showAllComments, setShowAllComments] = useState(false);

  const [postDeleteId, setPostDeleteId] = useState<string | null>(null);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [commentDeleteId, setCommentDeleteId] = useState<string | null>(null);

  const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);
  const [openMenuCommentId, setOpenMenuCommentId] = useState<string | null>(
    null,
  );

  const IsLiked = post.likes?.some((like) => like.userId === user?.id);

  const initialState = {
    isLiked: IsLiked,
    count: post._count?.likes ?? post.likes?.length ?? 0,
  };

  const [optimisticLike, setOptimisticLike] = useOptimistic(
    initialState,
    (state) => {
      return {
        isLiked: !state.isLiked,
        count: state.isLiked ? state.count - 1 : state.count + 1,
      };
    },
  );

  const toggleMenu = (postId: string) => {
    setOpenMenuPostId((prevId) => (prevId === postId ? null : postId));
  };

  const toggleMenuComments = (CommentId: string) => {
    setOpenMenuCommentId((prevId) => (prevId === CommentId ? null : CommentId));
  };

  const DeletePost = (postId: string) => {
    setPostDeleteId(postId);
    setOpenMenuPostId(null);
  };

  const EditPost = (postId: string) => {
    setEditPostId(postId);
    setOpenMenuPostId(null);
  };

  const EditComment = (commentId: string) => {
    setEditCommentId(commentId);
    setOpenMenuCommentId(null);
  };

  const DeleteComment = (commentId: string) => {
    setCommentDeleteId(commentId);
    setOpenMenuCommentId(null);
  };

  async function handleLike(postId: string) {
    if (!user) return;
    startTransition(async () => {
      setOptimisticLike(null);
      await toggleLikeAction(postId);
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 py-6 px-4">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors font-medium self-start"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar para o início
      </Link>

      <div className="w-full overflow-hidden rounded-3xl border border-border bg-surface shadow-sm">
        <article className="group block">
          <header className="flex items-center justify-between gap-3 px-4 py-3 relative">
            <div className="flex min-w-0 items-center gap-3">
              <div className="relative shrink-0">
                <Link href={`/cats/${post.cat.id}`}>
                  <Image
                    className="size-11 rounded-full object-cover ring-2 ring-primary/15 ring-offset-2 ring-offset-surface transition hover:ring-primary/40"
                    src={post.cat.avatarUrl}
                    alt={`Foto de perfil do ${post.cat.name}`}
                    width={44}
                    height={44}
                  />
                </Link>

                {post.author?.avatarUrl && (
                  <Link
                    href={`/profile/${post.author?.username}`}
                    className="absolute -bottom-0.5 -right-0.5 block transition hover:scale-110"
                    title={`Tutor: ${post.author?.name || "Tutor"}`}
                  >
                    <Image
                      className="size-5 rounded-full object-cover ring-2 ring-surface shadow-sm"
                      src={post.author.avatarUrl}
                      alt={`Foto de perfil de ${post.author?.name || "tutor"}`}
                      width={20}
                      height={20}
                    />
                  </Link>
                )}
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-foreground transition group-hover:text-primary">
                  <Link href={`/cats/${post.cat.id}`}>{post.cat.name}</Link>
                </h3>

                <p className="text-xs text-muted-foreground">
                  {post.cat.username}
                  {post.author?.name && (
                    <span className="text-muted-foreground/70">
                      {" "}
                      • por{" "}
                      <Link
                        href={`/profile/${post.author.username}`}
                        className="font-medium text-foreground transition hover:text-primary hover:underline"
                      >
                        {post.author.name}
                      </Link>
                    </span>
                  )}
                </p>
              </div>
            </div>

            {user &&
              (user.id === post.authorId || user.id === post.author?.id) && (
                <div className="absolute top-0 right-4">
                  <button
                    className="cursor-pointer font-bold text-2xl px-2 py-1 hover:opacity-75"
                    onClick={() => toggleMenu(post.id)}
                  >
                    ...
                  </button>

                  {openMenuPostId === post.id && (
                    <div className="absolute right-0 top-full mt-1 z-50 w-40 overflow-hidden rounded-2xl border border-border/70 bg-white/95 p-2 shadow-lg">
                      <div className="flex flex-col gap-1 text-sm">
                        <button
                          className="flex items-center gap-2 cursor-pointer w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-700 rounded-lg transition"
                          onClick={() => EditPost(post.id)}
                        >
                          <Pencil className="size-4" />
                          <span>Editar post</span>
                        </button>
                        <button
                          onClick={() => DeletePost(post.id)}
                          className="flex items-center gap-2 cursor-pointer w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600 rounded-lg transition"
                        >
                          <Trash2 className="size-4" />
                          <span>Deletar Post</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

            <p className="text-xs text-muted-foreground mt-7">
              {formatTimeToPost(post.createdAt)}
            </p>
          </header>

          {post.imageUrl && (
            <div className="relative block aspect-video mx-4 rounded-2xl overflow-hidden bg-muted">
              <Image
                className="object-cover"
                src={post.imageUrl}
                alt={post.caption || `Foto de ${post.cat.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 672px"
              />
            </div>
          )}

          <div className="px-4 py-4">
            <p className="mb-4 text-sm leading-relaxed text-foreground/80">
              <strong className="mr-1 font-bold text-foreground">
                {post.cat.name}
              </strong>
              {post.caption}
            </p>

            <div className="flex items-center gap-2 border-t border-border/70 pt-3">
              <button
                onClick={() => handleLike(post.id)}
                disabled={!user}
                className={`flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition ${
                  !user
                    ? "cursor-default text-muted-foreground opacity-80"
                    : optimisticLike.isLiked
                    ? "cursor-pointer bg-red-50 text-red-500 hover:bg-red-100"
                    : "cursor-pointer text-muted-foreground hover:text-primary"
                }`}
                title={!user ? "Faça login para curtir" : undefined}
              >
                <PawPrint className="size-5" strokeWidth={1.8} />
                <span>{optimisticLike.count}</span>
              </button>

              <span className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:text-primary">
                <MessageCircle className="size-5" strokeWidth={1.8} />
                <span>
                  {post._count?.comments ?? post.comments?.length ?? 0}
                </span>
              </span>
              {post._count && post._count.comments > 2 && (
                <button
                  onClick={() => setShowAllComments(!showAllComments)}
                  className="text-sm text-muted-foreground transition hover:text-primary cursor-pointer"
                >
                  {showAllComments
                    ? "Ver menos"
                    : `Ver todos os ${post._count.comments} comentários`}
                </button>
              )}
            </div>
          </div>

          {/* Comments section */}
          {post.comments && post.comments.length > 0 && (
            <ul className="flex flex-col gap-2 px-4 py-2 border-t border-border/50">
              {post.comments
                ?.slice(0, showAllComments ? undefined : 3)
                .map((comment) => (
                  <li
                    key={comment.id}
                    className="flex items-center justify-between gap-2 text-xs"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      {comment.user?.avatarUrl && (
                        <Image
                          className="size-6 rounded-full object-cover shrink-0"
                          src={
                            comment.user.avatarUrl || "/img/gatos/nouser.jpg"
                          }
                          alt={comment.user.name || "Avatar"}
                          width={24}
                          height={24}
                        />
                      )}
                      <div className="break-words">
                        <span className="font-semibold text-foreground mr-1">
                          {comment.user?.name || "Usuário"}:
                        </span>
                        <span className="text-muted-foreground">
                          {comment.content}
                        </span>
                      </div>
                    </div>

                    {user &&
                      (user.id === comment.userId ||
                        user.id === comment.user?.id) && (
                        <div className="relative shrink-0">
                          <button
                            onClick={() => toggleMenuComments(comment.id)}
                            className="cursor-pointer font-bold text-base px-2 py-0.5 text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-full transition leading-none"
                          >
                            ...
                          </button>

                          {openMenuCommentId === comment.id && (
                            <div className="absolute right-5 bottom-0 z-50 w-44 overflow-hidden rounded-2xl border border-border/70 bg-white/95 backdrop-blur-sm p-1.5 shadow-lg">
                              <div className="flex flex-col gap-1 text-sm">
                                <button
                                  className="flex items-center gap-2 cursor-pointer w-full text-left px-3 py-1.5 hover:bg-gray-100 text-gray-700 rounded-lg transition"
                                  onClick={() => EditComment(comment.id)}
                                >
                                  <Pencil className="size-4" />
                                  <span>Editar comentário</span>
                                </button>
                                <button
                                  onClick={() => {
                                    DeleteComment(comment.id);
                                    setOpenMenuCommentId(null);
                                  }}
                                  className="flex items-center gap-2 cursor-pointer w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600 rounded-lg transition"
                                >
                                  <Trash2 className="size-4" />
                                  <span>Apagar Comentário</span>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                  </li>
                ))}
            </ul>
          )}
          {user ? (
            <CommentsForm
              user={user}
              postId={post.id}
              comment={comment}
              setComment={setComment}
            />
          ) : (
            <div className="border-t border-border/50 px-4 py-3 text-center text-xs sm:text-sm text-muted-foreground bg-muted/20">
              <Link
                href="/register"
                className="font-semibold text-primary hover:underline"
              >
                Crie uma conta
              </Link>{" "}
              ou{" "}
              <Link
                href="/login"
                className="font-semibold text-primary hover:underline"
              >
                faça login
              </Link>{" "}
              para curtir e comentar nesse post.
            </div>
          )}
        </article>
      </div>

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
