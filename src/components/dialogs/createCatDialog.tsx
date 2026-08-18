"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera, Trash } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect } from "react";
import CatsLoading from "@/components/ui/loading";

interface CreateCatDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  error: string | null;
  loading: boolean;
  handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  imagePreview?: string | null;
  setImagePreview: (imagePreview: string | null) => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleCreateCat(e: FormEvent<HTMLFormElement>): Promise<void>;
}

export default function CreateCatDialog({
  open,
  setOpen,
  error,
  loading,
  handleCreateCat,
  handleFileChange,
  setImagePreview,
  imagePreview,
}: CreateCatDialogProps) {
  useEffect(() => {
    if (!open) {
      setImagePreview(null);
    }
  }, [open, setImagePreview]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-surface p-6 md:min-w-4xl">
        <DialogHeader>
          <DialogTitle className="mb-4 text-center text-2xl font-extrabold tracking-tight text-foreground font-nunito md:text-4xl">
            Adicionar novo gatinho
          </DialogTitle>

          <DialogDescription className="text-center text-primary">
            Crie um perfil especial para seu gatinho e compartilhe momentos com
            a comunidade!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleCreateCat}>
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
                    onClick={(e) => {
                      e.preventDefault();
                      setImagePreview(null);
                    }}
                    className="absolute right-3 top-3 z-20 cursor-pointer rounded-full bg-red-500 p-2 text-white shadow-md transition-colors hover:bg-red-600"
                  >
                    <Trash size={20} />
                  </button>
                </div>
              ) : (
                <label
                  htmlFor="photo"
                  className="relative flex h-full w-full cursor-pointer flex-col items-center justify-center p-6 text-center"
                >
                  <img
                    src="/img/background/imgpostar.png"
                    alt="Ilustração"
                    className="mb-4 max-h-36 object-contain"
                  />

                  <span className="mb-2 flex items-center gap-2 whitespace-nowrap rounded-2xl border border-primary p-2 px-4 font-bold text-primary hover:text-foreground">
                    <Camera size={22} />
                    Adicionar uma foto
                  </span>

                  <span className="text-sm text-muted-foreground">
                    PNG ou JPG
                  </span>
                </label>
              )}

              <input
                type="file"
                name="avatarUrl"
                id="photo"
                accept="image/png,image/jpeg"
                className={`absolute inset-0 h-full w-full cursor-pointer opacity-0 ${
                  imagePreview ? "pointer-events-none z-0" : "z-10"
                }`}
                onChange={handleFileChange}
              />
            </div>

            <div className="flex flex-col gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block font-semibold text-foreground"
                >
                  Nome
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Nome do gatinho"
                  required
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="birthDate"
                  className="mb-2 block font-semibold text-foreground"
                >
                  Data de nascimento
                </label>

                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block font-semibold text-foreground"
                >
                  Username
                </label>

                <input
                  type="text"
                  id="username"
                  name="username"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="bio"
                  className="mb-2 block font-semibold text-foreground"
                >
                  Bio
                </label>

                <textarea
                  id="bio"
                  name="bio"
                  rows={5}
                  placeholder="Conte um pouco sobre seu gatinho..."
                  className="w-full resize-none rounded-xl border border-border bg-background p-4 outline-none transition focus:border-primary"
                />
              </div>

              {error && (
                <p className="text-center text-sm font-semibold text-red-500">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-auto flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-75"
              >
                {loading ? (
                  <>
                    <CatsLoading className="h-auto w-8 text-white" />
                    <span>Criando perfil...</span>
                  </>
                ) : (
                  "Criar perfil"
                )}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
