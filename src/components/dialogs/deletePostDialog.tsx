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
import { Dispatch, SetStateAction } from "react";

type deletePostDialogProps = {
  postToDeleteId: string | null;
  setPostDeleteId: Dispatch<SetStateAction<string | null>>;
};

export default function DeletePostDialog({
  postToDeleteId,
  setPostDeleteId,
}: deletePostDialogProps) {
  const router = useRouter();
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
            <DialogClose className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100">
              Cancelar
            </DialogClose>

            <button
              onClick={() => {
                if (!postToDeleteId) return;
                DeletePostAction(postToDeleteId);
                router.refresh();
                setPostDeleteId(null);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition"
            >
              Sim, deletar
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
