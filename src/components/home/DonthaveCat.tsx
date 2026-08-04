import { Check, User, HeartIcon, Book, MessageSquare } from "lucide-react";

export default function DonthaveCat() {
  return (
    <div className="mt-6 w-full max-w-[1700px] mx-auto px-4 relative">
      <img
        src="/img/gatos/nocat.png"
        alt=""
        className="w-full h-auto block rounded-2xl"
      />
      <div className="absolute right-0 top-0 bottom-0 left-0 flex flex-col items-center justify-center translate-x-20">
        <p className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Não tem gato?{" "}
          <span className="text-primary text-2xl md:text-4xl">
            Não tem problema!
          </span>
        </p>
        <p className="text-2xl md:text-4xl font-extrabold tracking-tight text-foreground">
          Você também é muito bem vindo aqui!
        </p>
        <p className="text-1xl mt-1 font-extrabold tracking-tight text-muted-foreground">
          Aqui, todos que amam gatos tem espaço.
          <br />
          Explore, aprenda, divirta-se e faça parte da nossa comunidade!
        </p>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8 max-w-3xl justify-center">
          <li className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary shrink-0" />
            <p className="font-semibold text-foreground">
              Crie sua conta gratuitamente
            </p>
          </li>
          <li className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary shrink-0" />
            <p className="font-semibold text-foreground">
              Crie seu perfil de entusiasta
            </p>
          </li>
          <li className="flex items-center gap-2">
            <HeartIcon className="w-5 h-5 text-primary shrink-0" />
            <p className="font-semibold text-foreground">
              Demonstre seu amor pelos felinos
            </p>
          </li>
          <li className="flex items-center gap-2">
            <Book className="w-5 h-5 text-primary shrink-0" />
            <p className="font-semibold text-foreground">
              Aprenda dicas e cuidados felinos
            </p>
          </li>
          <li className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-primary shrink-0" />
            <p className="font-semibold text-foreground">
              Troque experiências na comunidade
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
