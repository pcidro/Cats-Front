"use client";
import { EditCommentAction } from "@/actions/comment/editCommentAction";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { toast } from "sonner";
import CatsLoading from "@/components/ui/loading";

type EditCommentDialogProps = {
  commentToEditId: string | null;
  setCommentEditId: Dispatch<SetStateAction<string | null>>;
};

export default function EditCommentDialog({
  commentToEditId,
  setCommentEditId,
}: EditCommentDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEditComment(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await EditCommentAction(formData);

      if (res.ok) {
        toast.success("Comentário editado com sucesso!");
        setCommentEditId(null);
        router.refresh();
      } else {
        const errorMsg = res.errors?.form || "Erro ao editar o comentário.";
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
    <div>
      <Dialog
        open={!!commentToEditId}
        onOpenChange={(open) => {
          if (!open) {
            setCommentEditId(null);
            setError(null);
          }
        }}
      >
        <DialogContent className="p-6 bg-surface">
          <DialogHeader>
            <DialogTitle>Editar comentário</DialogTitle>
            <DialogDescription>
              Edite o conteúdo do seu comentário abaixo.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEditComment} className="flex flex-col gap-3 mt-2">
            <textarea
              rows={3}
              className="w-full resize-none rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary/20"
              placeholder="Digite o novo comentário..."
              name="content"
              id="content"
              required
            />

            <input
              type="hidden"
              name="commentToEditId"
              value={commentToEditId ?? ""}
            />

            {error && (
              <p className="text-sm font-semibold text-destructive text-center">
                {error}
              </p>
            )}

            <DialogFooter className="justify-center sm:justify-center mt-2 gap-2">
              <DialogClose
                disabled={loading}
                className="px-4 py-2 text-sm font-medium rounded-xl border border-border hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer disabled:opacity-50"
              >
                Cancelar
              </DialogClose>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2 min-w-[90px]"
              >
                {loading ? (
                  <>
                    <CatsLoading className="w-8 h-auto text-white" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  "Salvar"
                )}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
