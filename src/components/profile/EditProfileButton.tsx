"use client";

import { useUser } from "@/context/userContext";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import EditProfileDialog from "../dialogs/editprofileDialog";
import { EditUserAction } from "@/actions/user/EditUserAction";

interface EditProfileButtonProps {
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    email?: string;
  };
}

export default function EditProfileButton({ user }: EditProfileButtonProps) {
  const userDono = useUser();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function handleEdit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const res = await EditUserAction(formData);

      if (res.ok) {
        toast.success("Informações atualizadas com sucesso!");
        setOpen(false);
        const newUsername = (formData.get("username") as string)?.trim();

        if (newUsername && newUsername !== user.username) {
          router.push(`/profile/${newUsername}`);
        } else {
          router.refresh();
        }
      } else {
        const errorMsg = res.errors?.form || "Erro ao atualizar.";
        toast.error(errorMsg);
        setError(errorMsg);
      }
    } catch {
      const errorMsg = "Ocorreu um erro ao atualizar.";
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {userDono.user?.id === user.id && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/80 bg-surface/90 hover:bg-surface text-foreground text-sm font-medium transition-colors shadow-xs cursor-pointer"
        >
          <Pencil className="size-3.5 text-primary" />
          <span>Editar perfil</span>
        </button>
      )}
      <EditProfileDialog
        open={open}
        setOpen={setOpen}
        loading={loading}
        error={error}
        setError={setError}
        user={userDono.user}
        handleEdit={handleEdit}
      />
    </div>
  );
}
