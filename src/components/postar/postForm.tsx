"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CreatePostDialog from "../dialogs/createPostDialog";
import { Plus } from "lucide-react";
import { createPostAction } from "@/actions/post/createPostAction";

export default function PostForm() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleCreatePost(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await createPostAction(formData);

    if (result.ok) {
      setOpen(false);
      router.refresh();
      return;
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
        loading={loading}
        setLoading={setLoading}
        handleCreatePost={handleCreatePost}
      />
    </>
  );
}
