"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserCatsAction } from "@/actions/cat/getCatByUser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CatType } from "@/types/catType";
import { Camera } from "lucide-react";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

interface createPostDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  error: string | null;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleCreatePost(e: FormEvent<HTMLFormElement>): Promise<void>;
}

export default function CreatePostDialog({
  open,
  setOpen,
  error,
  loading,
  handleCreatePost,
}: createPostDialogProps) {
  const [cats, setCats] = useState<CatType[]>([]);
  const [selectedCatId, setSelectedCatId] = useState("");

  useEffect(() => {
    if (!open) {
      return;
    }

    async function getCats() {
      if (!open) return;

      const cats = await getUserCatsAction();
      setCats(cats);
    }

    getCats();
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-6 bg-surface min-w-4xl ">
        <DialogHeader>
          <DialogTitle className="text-2xl font-nunito md:text-4xl font-extrabold tracking-tight text-foreground text-center mb-4">
            Postar nova foto
          </DialogTitle>
          <DialogDescription className="text-primary text-center">
            Compartilhe um momento especial com a comunidade!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleCreatePost}>
          <div className="grid md:grid-cols-[288px_1fr] gap-5 ">
            <div className="flex flex-col border-dashed border-2 border-primary rounded bg-[#FAF2EF] p-3 w-2xs">
              <img src="/img/background/imgpostar.png" />
              <label
                htmlFor="photo"
                className="flex cursor-pointer flex-col items-center justify-center rounded-xl  p-8 transition"
              >
                <span className="text-primary flex items-center gap-2 mb-2 border border-primary p-2 rounded-2xl font-bold hover:text-foreground whitespace-nowrap ">
                  <Camera size={22} />
                  Adicionar uma foto
                </span>
                <span className="text-sm text-muted-foreground">
                  PNG ou JPG
                </span>
              </label>
              <input
                type="file"
                name="imageUrl"
                className="hidden"
                id="photo"
              />
            </div>
            <div>
              <h3 className="text-xs md:text-sm font-extrabold tracking-tight text-foreground text-center mb-2">
                Qual gatinho está postando?
              </h3>
              <div className="space-y-4">
                <div>
                  <input
                    type="hidden"
                    name="selectedCatId"
                    value={selectedCatId}
                  />
                  <Select
                    value={selectedCatId}
                    onValueChange={(val) => setSelectedCatId(val || "")}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione um gatinho">
                        {(value) => {
                          const selectedCat = cats.find(
                            (cat) => cat.id === value,
                          );
                          if (!selectedCat) return null;
                          return (
                            <div className="flex items-center gap-2">
                              <Image
                                src={
                                  selectedCat.avatarUrl ||
                                  "/img/gatos/nouser.jpg"
                                }
                                alt={selectedCat.name}
                                width={24}
                                height={24}
                                className="size-6 rounded-full object-cover"
                              />
                              <span>{selectedCat.name}</span>
                            </div>
                          );
                        }}
                      </SelectValue>
                    </SelectTrigger>

                    <SelectContent>
                      {cats.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          <div className="flex items-center gap-2">
                            <Image
                              src={cat.avatarUrl || "/img/gatos/nouser.jpg"}
                              alt={cat.name}
                              width={28}
                              height={28}
                              className="size-7 rounded-full object-cover"
                            />

                            <span>{cat.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="mb-2 block font-medium">Legenda</label>
                  <textarea
                    name="caption"
                    className="w-full rounded-lg border p-3"
                    rows={4}
                    placeholder="Conte a história dessa foto..."
                  />
                  {error && (
                    <p className="text-sm font-semibold text-red-500 text-center">
                      {error}
                    </p>
                  )}
                </div>

                {loading ? (
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-3 font-semibold text-white"
                  >
                    Publicando...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-primary py-3 font-semibold text-white"
                  >
                    Publicar foto
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
