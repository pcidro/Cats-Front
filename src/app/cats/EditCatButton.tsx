"use client";

import { Button } from "@/components/ui/button";
import EditCatDialog from "@/components/dialogs/EditCatDialog";
import { CatType } from "@/types/catType";
import { useState } from "react";
import { useUser } from "@/context/userContext";

interface EditCatButtonProps {
  cat: CatType;
}

export default function EditCatButton({ cat }: EditCatButtonProps) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <div>
      {user?.id === cat.ownerId && (
        <Button onClick={() => setOpen(true)} className="mt-4">
          Editar Gato
        </Button>
      )}
      <EditCatDialog open={open} setOpen={setOpen} cat={cat} />
    </div>
  );
}
