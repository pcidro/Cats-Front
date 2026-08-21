"use client";

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
import deleteUserAction from "@/actions/user/DeleteUserAction";

type DeleteUserDialogProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  userId: string | undefined;
  onDeleted?: () => void;
};

export default function DeleteUserDialog({
  open,
  setOpen,
  userId,
  onDeleted,
}: DeleteUserDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!userId) return;
    setLoading(true);
    try {
      const res = await deleteUserAction();
      if (res?.ok) {
        setOpen(false);
        if (onDeleted) {
          onDeleted();
        }
        window.location.href = "/login";
      } else {
        toast.error(res?.errors?.form || "Erro ao excluir o usuário.");
      }
    } catch {
      toast.error("Ocorreu um erro ao excluir o usuário.");
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
            Esta ação não poderá ser desfeita. a sua conta será removida
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
              "Sim, excluir minha conta"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
