import { CatType } from "@/types/catType";
import { PostType } from "@/types/postType";
import { Camera, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProfilePhotosType {
  photos: {
    id: string;
    name: string;
    username: string;
    avatarUrl?: string;
    email?: string;
    cats: CatType[];
    posts: PostType[];
  };
}

export default function ProfilePhotos({ photos }: ProfilePhotosType) {
  return (
    <div className="mt-8 w-full bg-white border border-border/70 shadow-xs p-6 sm:p-8 rounded-3xl flex flex-col gap-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Camera className="size-6 text-primary" />
          <h2 className="text-xl sm:text-2xl font-nunito font-extrabold tracking-tight text-foreground">
            Publicações ({photos.posts?.length || 0})
          </h2>
        </div>
      </div>

      {photos.posts && photos.posts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {photos.posts.map((post) => (
            <Link
              key={post.id}
              href="/post"
              className="group relative aspect-square overflow-hidden rounded-2xl bg-muted border border-border/60"
            >
              <Image
                src={post.imageUrl}
                alt={post.caption || `Post de ${post.cat.name}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <span className="text-xs font-semibold bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full self-start">
                  {post.cat.name}
                </span>

                <div className="flex items-center gap-3 justify-center text-sm font-bold">
                  <span className="flex items-center gap-1">
                    <Heart className="size-4 fill-white" />
                    {post._count.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="size-4 fill-white" />
                    {post._count.comments}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-full py-12 text-center text-muted-foreground text-sm border-2 border-dashed border-border/60 rounded-2xl">
          <p>Nenhuma publicação feita ainda.</p>
        </div>
      )}
    </div>
  );
}
