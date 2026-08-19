import { PostType } from "@/types/postType";
import { Camera, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfileCatPhotosProps {
  posts?: PostType[];
}

export default function ProfileCatPhotos({
  posts = [],
}: ProfileCatPhotosProps) {
  return (
    <div className="mt-8 w-full bg-white border border-border/70 shadow-xs p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Camera className="size-6 text-primary" />
          <h2 className="text-xl sm:text-2xl font-nunito font-extrabold tracking-tight text-foreground">
            Publicações ({posts.length})
          </h2>
        </div>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="group relative aspect-square overflow-hidden rounded-2xl bg-muted border border-border/60"
            >
              <Image
                src={post.imageUrl}
                alt={post.caption || "Foto do gato"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 text-white">
                <div className="flex items-center gap-3 text-sm font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="size-4 fill-white" />
                    {post._count?.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-4 fill-white" />
                    {post._count?.comments || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full py-12 text-center text-muted-foreground text-sm border-2 border-dashed border-border/60 rounded-2xl">
          <p>Nenhuma foto deste gatinho ainda.</p>
        </div>
      )}
    </div>
  );
}
