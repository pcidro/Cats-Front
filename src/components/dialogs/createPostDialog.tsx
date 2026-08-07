import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Camera } from "lucide-react";
import { FormEvent } from "react";

interface createPostDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  error: string | null;
  loading: boolean;
  handleCreatePost(e: FormEvent<HTMLFormElement>): Promise<void>;
}

export default function CreatePostDialog({
  open,
  setOpen,
  error,
  loading,
  handleCreatePost,
}: createPostDialogProps) {
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
              <span className="text-sm text-muted-foreground">PNG ou JPG</span>
            </label>
            <input type="file" className="hidden" id="photo" />
          </div>
          <div>
            <h3 className="text-xs md:text-sm font-extrabold tracking-tight text-foreground text-center mb-2">
              Qual gatinho está postando?
            </h3>
            <form>
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block font-medium">Nome</label>
                  <textarea
                    className="w-full rounded-lg border p-3"
                    rows={4}
                    placeholder="Coloque o nome do seu gatinho..."
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium">Legenda</label>
                  <textarea
                    className="w-full rounded-lg border p-3"
                    rows={4}
                    placeholder="Conte a história dessa foto..."
                  />
                </div>

                <button className="w-full rounded-xl bg-primary py-3 font-semibold text-white">
                  Publicar foto
                </button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
