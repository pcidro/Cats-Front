"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Trash, Trash2 } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CatsLoading from "@/components/ui/loading";
import { UserResponse } from "@/utils/getuser";

interface EditProfileDialogProps {
  loading: boolean;
  user: UserResponse | null;
  error: string | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  setError: Dispatch<SetStateAction<string | null>>;
  handleEdit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export default function EditProfileDialog({
  open,
  user,
  setOpen,
  loading,
  error,
  setError,
  handleEdit,
}: EditProfileDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [username, setUsername] = useState(user?.username);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.avatarUrl || null,
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (open) {
      setUsername(user?.username);
      setImagePreview(user?.avatarUrl || null);
      setError(null);
    }
  }, [open, user]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleRemoveImage() {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-surface p-6 md:min-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="mb-2 text-center text-2xl font-extrabold tracking-tight text-foreground font-nunito md:text-4xl">
              Editar Perfil
            </DialogTitle>

            <DialogDescription className="text-center text-primary">
              Atualize foto de perfil e seu username!
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleEdit} className="mt-4">
            <div className="grid gap-6 md:grid-cols-[288px_1fr]">
              <div className="relative flex min-h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-primary bg-[#FAF2EF]">
                {imagePreview ? (
                  <div className="relative h-full min-h-[280px] w-full">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />

                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      title="Remover foto"
                      className="absolute right-3 top-3 z-20 cursor-pointer rounded-full bg-red-500 p-2 text-white shadow-md transition-colors hover:bg-red-600"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="photo-edit"
                    className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center p-6 text-center"
                  >
                    <img
                      src="/img/background/imgpostar.png"
                      alt="Ilustração"
                      className="mb-4 max-h-36 object-contain"
                    />

                    <span className="mb-2 flex items-center gap-2 whitespace-nowrap rounded-2xl border border-primary p-2 px-4 font-bold text-primary hover:text-foreground">
                      <Camera size={22} />
                      Alterar foto
                    </span>

                    <span className="text-sm text-muted-foreground">
                      PNG ou JPG
                    </span>
                  </label>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  name="avatarUrl"
                  id="photo-edit"
                  accept="image/png,image/jpeg"
                  className={`absolute inset-0 h-full w-full cursor-pointer opacity-0 ${
                    imagePreview ? "pointer-events-none z-0" : "z-10"
                  }`}
                  onChange={handleFileChange}
                />
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label
                    htmlFor="edit-name"
                    className="mb-2 block font-semibold text-foreground text-sm"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="edit-username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Seu novo username"
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 outline-none transition focus:border-primary text-sm"
                  />
                </div>

                {error && (
                  <p className="text-center text-sm font-semibold text-red-500">
                    {error}
                  </p>
                )}

                <div className="mt-2 flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-border">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setDeleteDialogOpen(true)}
                    className="flex w-full sm:w-auto items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 size={16} />
                    <span>Excluir usuário</span>
                  </button>

                  <div className="flex w-full sm:w-auto items-center gap-2">
                    <button
                      type="button"
                      disabled={loading}
                      onClick={() => setOpen(false)}
                      className="w-full sm:w-auto px-4 py-2.5 text-sm font-medium rounded-xl border border-border hover:bg-black/5 dark:hover:bg-white/5 transition cursor-pointer disabled:opacity-50"
                    >
                      Cancelar
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-2.5 font-semibold text-white text-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-75 cursor-pointer min-w-[150px]"
                    >
                      {loading ? (
                        <>
                          <CatsLoading className="h-auto w-6 text-white" />
                          <span>Salvando...</span>
                        </>
                      ) : (
                        "Salvar alterações"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
