"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreatePostDialog from "../dialogs/createPostDialog";
import { Plus } from "lucide-react";
import { createPostAction } from "@/actions/post/createPostAction";
import { toast } from "sonner";

export default function PostForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  }

  async function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createPostAction(formData);

    if (result.ok) {
      toast.success("Post criado com sucesso!");
      setOpen(false);
      router.refresh();
      setLoading(false);
      return;
    }

    if (!result.ok) {
      const errorMsg = result.errors?.form || "Erro ao criar o post";
      toast.error(errorMsg);
      setError(errorMsg);
    }

    setLoading(false);
  }

  return (
    <>
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary/60 hover:text-foreground"
        onClick={() => setOpen(true)}
      >
        <Plus className="h-5 w-5" />
        Postar
      </button>
      <CreatePostDialog
        open={open}
        setOpen={(val) => {
          setOpen(val);
          if (!val) {
            setError(null);
          }
        }}
        error={error}
        imagePreview={imagePreview}
        handleFileChange={handleFileChange}
        setImagePreview={setImagePreview}
        loading={loading}
        setLoading={setLoading}
        handleCreatePost={handleCreatePost}
      />
    </>
  );
}
