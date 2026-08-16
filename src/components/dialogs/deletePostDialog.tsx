"use client";
import { DeletePostAction } from "@/actions/post/deletePostAction";
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
import CatsLoading from "@/components/ui/loading";

type deletePostDialogProps = {
  postToDeleteId: string | null;
  setPostDeleteId: Dispatch<SetStateAction<string | null>>;
};

export default function DeletePostDialog({
  postToDeleteId,
  setPostDeleteId,
}: deletePostDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!postToDeleteId) return;
    setLoading(true);
    try {
      const res = await DeletePostAction(postToDeleteId);
      if (res?.ok) {
        toast.success("Post deletado com sucesso!");
        setPostDeleteId(null);
        router.refresh();
      } else {
        toast.error(res?.errors?.form || "Erro ao deletar o post.");
      }
    } catch (err) {
      toast.error("Ocorreu um erro ao deletar o post.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog
        open={!!postToDeleteId}
        onOpenChange={(open) => {
          if (!open) {
            setPostDeleteId(null);
          }
        }}
      >
        <DialogContent className="p-6 bg-surface">
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja deletar este post?</DialogTitle>
            <DialogDescription>
              Esta ação não poderá ser desfeita. O post será removido
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
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed min-w-[110px]"
            >
              {loading ? (
                <>
                  <CatsLoading className="w-8 h-auto text-white" />
                  <span>Deletando...</span>
                </>
              ) : (
                "Sim, deletar"
              )}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
