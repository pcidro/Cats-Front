"use client";
import { PostType } from "@/types/postType";
import formatTimeToPost from "@/utils/formattimetoPost";
import { Pencil, Trash2, PawPrint, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CommentsForm from "../comments/CommentsForm";
import { useUser } from "@/context/userContext";
import { startTransition, useOptimistic, useState } from "react";
import { toggleLikeAction } from "@/actions/like/toggleLikeAction";
import { useRouter } from "next/navigation";

interface PostCardProps {
  post: PostType;
  onEditPost: (postId: string) => void;
  onDeletePost: (postId: string) => void;
  onEditComment: (commentId: string) => void;
  onDeleteComment: (commentId: string) => void;
}

export default function PostCard({
  post,
  onEditPost,
  onDeletePost,
  onEditComment,
  onDeleteComment,
}: PostCardProps) {
  const { user } = useUser();
  const [comment, setComment] = useState<string | null>("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);
  const [openMenuCommentId, setOpenMenuCommentId] = useState<string | null>(
    null,
  );

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

  const toggleMenu = (postId: string) => {
    setOpenMenuPostId((prevId) => (prevId === postId ? null : postId));
  };

  const toggleMenuComments = (CommentId: string) => {
    setOpenMenuCommentId((prevId) => (prevId === CommentId ? null : CommentId));
  };

  const DeletePost = (postId: string) => {
    onDeletePost(postId);
    setOpenMenuPostId(null);
  };

  const EditPost = (postId: string) => {
    onEditPost(postId);
    setOpenMenuPostId(null);
  };

  const EditComment = (commentId: string) => {
    onEditComment(commentId);
    setOpenMenuCommentId(null);
  };

  const DeleteComment = (commentId: string) => {
    onDeleteComment(commentId);
    setOpenMenuCommentId(null);
  };

  async function handleLike(postId: string) {
    startTransition(async () => {
      setOptimisticLike(null);
      await toggleLikeAction(postId);
    });
  }

  return (
    <li
      key={post.id}
      className="w-full mb-4 md:max-w-2xl overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <article className="group block">
        {/* Post header */}
        <header className="flex items-center justify-between gap-3 px-4 py-3 relative">
          <div className="flex min-w-0 items-center gap-3">
            {/* Avatar section with Cat photo + Tutor mini badge */}
            <div className="relative shrink-0">
              <Link href="/post">
                <Image
                  className="size-11 rounded-full object-cover ring-2 ring-primary/15 ring-offset-2 ring-offset-surface transition hover:ring-primary/40"
                  src={post.cat.avatarUrl}
                  alt={`Foto de perfil do ${post.cat.name}`}
                  width={44}
                  height={44}
                />
              </Link>

              {/* Tutor Mini Avatar Badge */}
              <Link
                href="/perfiluser"
                className="absolute -bottom-0.5 -right-0.5 block transition hover:scale-110"
                title={`Tutor: ${post.author?.name || "Tutor"}`}
              >
                <Image
                  className="size-5 rounded-full object-cover ring-2 ring-surface shadow-sm"
                  src={post.author?.avatarUrl}
                  alt={`Foto de perfil de ${post.author?.name || "tutor"}`}
                  width={20}
                  height={20}
                />
              </Link>
            </div>

            <div className="min-w-0">
              <h3 className="font-bold text-foreground transition group-hover:text-primary">
                <Link href="/post">{post.cat.name}</Link>
              </h3>

              <p className="text-xs text-muted-foreground">
                {post.cat.username}
                {post.author?.name && (
                  <span className="text-muted-foreground/70">
                    {" "}
                    • por{" "}
                    <Link
                      href="/perfiluser"
                      className="font-medium text-foreground transition hover:text-primary hover:underline"
                    >
                      {post.author.name}
                    </Link>
                  </span>
                )}
              </p>
            </div>
          </div>

          {user && (
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

        {/* Post image */}
        <Link
          href="/post"
          className="relative block aspect-video mx-4 rounded-2xl overflow-hidden bg-muted"
        >
          <Image
            className="object-cover transition duration-500 group-hover:scale-[1.02]"
            src={post.imageUrl}
            alt={post.caption || `Foto de ${post.cat.name}`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
          />
        </Link>

        {/* Post content */}
        <div className="px-4 py-4">
          <p className="mb-4 text-sm leading-relaxed text-foreground/80">
            <strong className="mr-1 font-bold text-foreground">
              {post.cat.name}
            </strong>
            {post.caption}
          </p>

          {/* Post stats */}
          <div className="flex items-center gap-2 border-t border-border/70 pt-3">
            <button
              onClick={() => handleLike(post.id)}
              className={`cursor-pointer flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition ${
                optimisticLike.isLiked
                  ? "bg-red-50 text-red-500 hover:bg-red-100"
                  : "text-muted-foreground hover:text-primary"
              }`}
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
                  : `  Ver todos os ${post._count.comments} comentários`}
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
                        src={comment.user.avatarUrl || "/img/gatos/nouser.jpg"}
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

                  {user && (
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
        {user && (
          <CommentsForm
            user={user}
            postId={post.id}
            comment={comment}
            setComment={setComment}
          />
        )}
      </article>
    </li>
  );
}
