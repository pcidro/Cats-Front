import createCommentAction from "@/actions/comment/createComment";
import { UserResponse } from "@/utils/getuser";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
import CatsLoading from "@/components/ui/loading";

interface CommentsFormProps {
  user: UserResponse;
  comment: string | null;
  setComment: Dispatch<SetStateAction<string | null>>;
  postId: string;
  className?: string;
}

export default function CommentsForm({
  user,
  postId,
  comment,
  setComment,
  className,
}: CommentsFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData(e.currentTarget);
      const res = await createCommentAction(formData);

      if (res.ok) {
        router.refresh();
        setComment(null);
      } else {
        const errorMsg = res.errors?.form || "Erro ao comentar.";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      toast.error("Ocorreu um erro inesperado.");
      setError("Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`px-3.5 flex items-center gap-2 mb-2 ${className || ""}`}>
      <img
        className="size-7 rounded-full object-cover shrink-0"
        src={user.avatarUrl || "/img/gatos/nouser.jpg"}
        alt={user.name}
      />

      <form onSubmit={handleComment} className="flex flex-1 items-center gap-2 min-w-0">
        <input type="hidden" name="postId" value={postId} />
        <textarea
          rows={1}
          placeholder="Comentar..."
          name="content"
          value={comment || ""}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 resize-none h-10 overflow-hidden rounded-xl border border-border bg-surface px-3 py-2 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/20 leading-tight"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-4 py-2 rounded-xl text-sm transition cursor-pointer disabled:opacity-75 shrink-0 flex items-center justify-center min-w-[80px]"
        >
          {loading ? (
            <CatsLoading className="w-8 h-auto text-white" />
          ) : (
            "Publicar"
          )}
        </button>
      </form>
    </div>
  );
}
