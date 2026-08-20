"use client";

import { useRouter } from "next/navigation";
import { MessageCircle, PawPrint, Pencil, Trash2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PostType } from "@/types/postType";
import { startTransition, useOptimistic, useState } from "react";
import { useUser } from "@/context/userContext";
import { toggleLikeAction } from "@/actions/like/toggleLikeAction";
import CommentsForm from "@/components/comments/CommentsForm";
import DeletePostDialog from "@/components/dialogs/deletePostDialog";
import EditPostDialog from "@/components/dialogs/editPostDIalog";
import DeleteCommentDialog from "@/components/dialogs/deleteCommentDialog";
import EditCommentDialog from "@/components/dialogs/EditCommentDialog";

interface PostModalProps {
  post: PostType;
}

export function PostModal({ post }: PostModalProps) {
  const [showAllComments, setShowAllComments] = useState(false);
  const [comment, setComment] = useState<string | null>("");
  const [postDeleteId, setPostDeleteId] = useState<string | null>(null);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [commentDeleteId, setCommentDeleteId] = useState<string | null>(null);
  const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);
  const [openMenuCommentId, setOpenMenuCommentId] = useState<string | null>(
    null,
  );
  const router = useRouter();
  const { user } = useUser();

  function handleClose() {
    router.back();
  }

  const IsLiked = post.likes?.some((like) => like.userId === user?.id);

  const initialState = {
    isLiked: IsLiked,
    count: post._count.likes,
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

  async function handleLike(postId: string) {
    if (!user) return;
    startTransition(async () => {
      setOptimisticLike(null);
      await toggleLikeAction(postId);
    });
  }

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={handleClose} />

      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-background shadow-2xl border border-border">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/90 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative min-h-[280px] md:min-h-[360px] bg-muted flex items-center justify-center overflow-hidden">
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.caption || "Post"}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-muted-foreground text-sm">Sem imagem</span>
            )}
          </div>

          <div className="flex flex-col p-5 justify-between gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center gap-3">
                  {post.cat?.avatarUrl && (
                    <Image
                      src={post.cat.avatarUrl}
                      alt={post.cat.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-bold text-foreground text-sm">
                      {post.cat?.name || "Gato"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      @{post.cat?.username || post.author?.username}
                    </p>
                  </div>
                </div>

                {user &&
                  (user.id === post.authorId ||
                    user.id === post.author?.id) && (
                    <div className="relative">
                      <button
                        className="cursor-pointer font-bold text-xl px-2 py-0.5 text-muted-foreground hover:text-foreground hover:bg-black/5 rounded-full transition leading-none"
                        onClick={() => toggleMenu(post.id)}
                      >
                        ...
                      </button>

                      {openMenuPostId === post.id && (
                        <div className="absolute right-0 top-full mt-1 z-50 w-44 overflow-hidden rounded-2xl border border-border/70 bg-white/95 backdrop-blur-sm p-1.5 shadow-lg">
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
              </div>

              <p className="text-sm text-foreground leading-relaxed">
                {post.caption}
              </p>
            </div>

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
                <span>{post._count.comments}</span>
              </span>
              {post._count.comments > 2 && (
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
                          <div className="relative">
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
                className="px-0 mb-0 w-full min-w-0"
              />
            ) : (
              <div className="border-t border-border/50 pt-3 text-center text-xs text-muted-foreground">
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
          </div>
        </div>
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
