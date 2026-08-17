"use client";

import { Pencil } from "lucide-react";

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
  function handleEdit() {}

  return (
    <button
      type="button"
      onClick={handleEdit}
      className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-border/80 bg-surface/90 hover:bg-surface text-foreground text-sm font-medium transition-colors shadow-xs cursor-pointer"
    >
      <Pencil className="size-3.5 text-primary" />
      <span>Editar perfil</span>
    </button>
  );
}
