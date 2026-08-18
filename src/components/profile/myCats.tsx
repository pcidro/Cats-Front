"use client";

import { useUser } from "@/context/userContext";
import { CatType } from "@/types/catType";
import { PostType } from "@/types/postType";
import { PawPrint, Plus, Heart } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CreateCatDialog from "../dialogs/createCatDialog";
import { AddCatAction } from "@/actions/cat/AddCatAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface MyCatsProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    email?: string;
    cats: CatType[];
    posts: PostType[];
  };
}

export default function MyCats({ user }: MyCatsProps) {
  const userDono = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  }

  async function handleCreateCat(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await AddCatAction(formData);

    if (result.ok) {
      toast.success("Gato adicionado com sucesso!");
      setOpen(false);
      router.refresh();
      setLoading(false);
      return;
    }

    if (!result.ok) {
      const errorMsg = result.errors?.form || "Erro ao criar o gato";
      toast.error(errorMsg);
      setError(errorMsg);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="w-full bg-white border border-border/70 shadow-xs p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <PawPrint className="size-6 text-primary" />
            <h2 className="text-xl sm:text-2xl font-nunito font-extrabold tracking-tight text-foreground">
              Meus gatos
            </h2>
          </div>

          {userDono.user?.id === user.id && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-orange-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus className="size-4 text-primary" color="white" />
              <span>Adicionar gato</span>
            </button>
          )}
        </div>

        {/* Grid de Cards dos Gatos */}
        {user.cats && user.cats.length > 0 ? (
          <ul className="w-full flex flex-col md:flex-row flex-wrap items-center justify-center gap-6">
            {user.cats.map((cat) => (
              <li
                key={cat.id}
                className="border border-border/70 bg-surface hover:bg-surface/80 shadow-2xs hover:shadow-xs p-5 rounded-2xl flex flex-col items-center text-center transition-all duration-200"
              >
                <div className="relative mb-3">
                  <img
                    className="size-28 sm:size-32 rounded-full object-cover border-2 border-white shadow-xs"
                    src={cat.avatarUrl}
                    alt={cat.name}
                  />
                  <div className="absolute top-1 right-1 size-6 rounded-full bg-secondary border border-white shadow-2xs flex items-center justify-center">
                    <Heart className="size-3 fill-primary text-primary" />
                  </div>
                </div>

                <h3 className="font-bold font-nunito text-base text-foreground">
                  {cat.name}
                </h3>

                <Link
                  href={`/cat`}
                  className="mt-3.5 inline-flex items-center justify-center w-full py-1.5 px-3 rounded-xl border border-orange-200/80 bg-white hover:bg-orange-50 text-orange-900 text-xs font-semibold transition-colors"
                >
                  Ver perfil
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="w-full py-12 text-center text-muted-foreground text-sm border-2 border-dashed border-border/60 rounded-2xl">
            <p>Nenhum gatinho cadastrado ainda.</p>
          </div>
        )}
      </div>
      <CreateCatDialog
        open={open}
        setOpen={(val) => {
          setOpen(val);
          if (!val) setError(null);
        }}
        error={error}
        imagePreview={imagePreview}
        handleFileChange={handleFileChange}
        setImagePreview={setImagePreview}
        loading={loading}
        setLoading={setLoading}
        handleCreateCat={handleCreateCat}
      />
    </>
  );
}
