import userProfileAction from "@/actions/user/UserProfileAction";
import EditProfileButton from "@/components/profile/EditProfileButton";
import MyCats from "@/components/profile/myCats";
import ProfilePhotos from "@/components/profile/profilePhotos";
import Container from "@/components/ui/container";
import { Heart } from "lucide-react";

interface userPageParams {
  params: Promise<{ username: string }>;
}

export default async function PageProfile({ params }: userPageParams) {
  const user = await params;
  const { data } = await userProfileAction(user.username);
  if (!data) return null;

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

          <EditProfileButton user={data} />
        </div>
      </div>
      <Container className="mt-6">
        <MyCats user={data} />
        <ProfilePhotos photos={data} />
      </Container>
    </div>
  );
}
