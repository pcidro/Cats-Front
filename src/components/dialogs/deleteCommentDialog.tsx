"use client";
import { DeleteCommentAction } from "@/actions/comment/deleteCommentAction";
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
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

type deleteCommentDialogProps = {
  CommentToDeleteId: string | null;
  setCommentToDeleteId: Dispatch<SetStateAction<string | null>>;
};

export default function DeleteCommentDialog({
  CommentToDeleteId,
  setCommentToDeleteId,
}: deleteCommentDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!CommentToDeleteId) return;
    setLoading(true);
    try {
      const res = await DeleteCommentAction(CommentToDeleteId);
      if (res?.ok) {
        toast.success("Comentário deletado com sucesso!");
        setCommentToDeleteId(null);
        router.refresh();
      } else {
        toast.error(res?.errors?.form || "Erro ao deletar o comentário.");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar o comentário.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog
        open={!!CommentToDeleteId}
        onOpenChange={(open) => {
          if (!open) {
            setCommentToDeleteId(null);
          }
        }}
      >
        <DialogContent className="p-6 bg-surface">
          <DialogHeader>
            <DialogTitle>
              Tem certeza que deseja deletar este comentário?
            </DialogTitle>
            <DialogDescription>
              Esta ação não poderá ser desfeita. O comentário será removido
              permanentemente.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="justify-center sm:justify-center">
            <DialogClose
              disabled={loading}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancelar
            </DialogClose>

            <button
              disabled={loading}
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-50"
            >
              {loading ? "Deletando..." : "Sim, deletar"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
