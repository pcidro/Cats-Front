"use client";
import { EditPostAction } from "@/actions/post/editPostAction";
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

type editPostDialogProps = {
  postToEditId: string | null;
  setPostEditId: Dispatch<SetStateAction<string | null>>;
};

export default function EditPostDialog({
  postToEditId,
  setPostEditId,
}: editPostDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEditPost(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await EditPostAction(formData);

      if (res.ok) {
        setPostEditId(null);
        router.refresh();
      } else {
        setError(res.errors?.form || "Erro ao editar o post.");
      }
    } catch (err) {
      setError("Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Dialog
        open={!!postToEditId}
        onOpenChange={(open) => {
          if (!open) {
            setPostEditId(null);
            setError(null);
          }
        }}
      >
        <DialogContent className="p-6 bg-surface">
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja editar este post?</DialogTitle>
            <DialogDescription>
              Edite a descrição do post abaixo.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditPost}>
            <textarea
              className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs"
              placeholder="Digite a nova descrição da foto..."
              name="caption"
              id="caption"
            ></textarea>

            <input
              type="hidden"
              className="hidden"
              name="postToEditId"
              value={postToEditId ?? ""}
            />

            {error && (
              <p className="mt-2 text-sm font-semibold text-red-500 text-center">
                {error}
              </p>
            )}

            <DialogFooter className="justify-center sm:justify-center mt-4">
              <DialogClose
                disabled={loading}
                className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 hover:bg-gray-100 disabled:opacity-50"
              >
                Cancelar
              </DialogClose>

              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium bg-primary rounded-lg text-white hover:bg-amber-700 cursor-pointer duration-200 disabled:opacity-50"
              >
                {loading ? "Salvando..." : "Editar"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
