"use client";

import { DeleteCatAction } from "@/actions/cat/DeleteCatAction";
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
import { useUser } from "@/context/userContext";

type DeleteCatDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  catId: string | null;
  onDeleted?: () => void;
};

export default function DeleteCatDialog({
  open,
  setOpen,
  catId,
  onDeleted,
}: DeleteCatDialogProps) {
  const router = useRouter();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!catId) return;
    setLoading(true);
    try {
      const res = await DeleteCatAction(catId);
      if (res?.ok) {
        toast.success("Gatinho excluído com sucesso!");
        setOpen(false);
        if (onDeleted) {
          onDeleted();
        }
        if (user?.username) {
          router.push(`/profile/${user.username}`);
        } else {
          router.push("/");
        }
        router.refresh();
      } else {
        toast.error(res?.errors?.form || "Erro ao excluir o gatinho.");
      }
    } catch {
      toast.error("Ocorreu um erro ao excluir o gatinho.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 bg-surface">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja excluir?</DialogTitle>
          <DialogDescription>
            Esta ação não poderá ser desfeita. O gatinho será removido
            permanentemente.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="justify-center sm:justify-center mt-4">
          <DialogClose
            disabled={loading}
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition cursor-pointer disabled:opacity-50"
          >
            Cancelar
          </DialogClose>

          <button
            disabled={loading}
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition disabled:opacity-75 flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed min-w-[170px]"
          >
            {loading ? (
              <>
                <CatsLoading className="w-8 h-auto text-white" />
                <span>Excluindo...</span>
              </>
            ) : (
              "Sim, excluir gatinho"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
