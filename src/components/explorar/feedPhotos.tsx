"use client";
import { PostType } from "@/types/postType";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, PawPrint, Plus, Pencil, Trash2 } from "lucide-react";
import formatTimeToPost from "@/utils/formattimetoPost";
import Container from "../ui/container";
import { useUser } from "@/context/userContext";
import { useState } from "react";
import DeletePostDialog from "../dialogs/deletePostDialog";
import EditPostDialog from "../dialogs/editPostDIalog";
import CommentsForm from "../comments/CommentsForm";
import DeleteCommentDialog from "../dialogs/deleteCommentDialog";
import EditCommentDialog from "../dialogs/EditCommentDialog";

interface feedPhotosProps {
  posts: PostType[];
}

export default function FeedPhotos({ posts }: feedPhotosProps) {
  const { user } = useUser();
  const [openMenuPostId, setOpenMenuPostId] = useState<string | null>(null);
  const [postDeleteId, setPostDeleteId] = useState<string | null>(null);
  const [editPostId, setEditPostId] = useState<string | null>(null);
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [comment, setComment] = useState<string | null>("");
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentDeleteId, setCommentDeleteId] = useState<string | null>(null);
  const [openMenuCommentId, setOpenMenuCommentId] = useState<string | null>(
    null,
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
                    <span className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition hover:text-primary">
                      <PawPrint className="size-5" strokeWidth={1.8} />
                      <span>{post._count.likes}</span>
                    </span>

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
                                src={
                                  comment.user.avatarUrl ||
                                  "/img/gatos/nouser.jpg"
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
