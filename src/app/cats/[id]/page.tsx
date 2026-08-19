import GetCatByIdAction from "@/actions/cat/GetCatByIdAction";
import Container from "@/components/ui/container";
import { Heart } from "lucide-react";
import EditCatButton from "../EditCatButton";
import ProfileCatPhotos from "./profileCatPhotos";

interface pageCatsParams {
  params: Promise<{ id: string }>;
}

export default async function PageCats({ params }: pageCatsParams) {
  const cat = await params;
  const data = await GetCatByIdAction(cat.id);

  return (
    <div>
      <div className="relative w-full min-h-[380px] sm:min-h-[420px] overflow-hidden flex flex-col items-center justify-center p-6 sm:p-8">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/img/background/auth-background.png"
          alt="Fundo do perfil"
        />
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="relative mb-3">
            <img
              className="size-32 sm:size-40 rounded-full object-cover border-4 border-surface shadow-md"
              src={data.avatarUrl || "/img/gatos/nouser.jpg"}
              alt={data.name}
            />
            <div className="absolute bottom-1 right-1 size-8 rounded-full bg-secondary border-2 border-surface shadow-xs flex items-center justify-center">
              <Heart className="size-4 fill-primary text-primary" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            {data.name}
          </h1>
          <p className="text-sm font-medium text-muted-foreground mt-0.5">
            @{data.username}
          </p>

          {data.bio && (
            <p className="text-sm text-foreground/80 max-w-md mt-2">
              {data.bio}
            </p>
          )}

          <EditCatButton cat={data} />
        </div>
      </div>
      <Container className="mt-6">
        <ProfileCatPhotos posts={data.posts || []} />
      </Container>
    </div>
  );
}
