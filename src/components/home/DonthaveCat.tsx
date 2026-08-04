import Image from "next/image";
import { Check, User, HeartIcon, Book, MessageSquare } from "lucide-react";
import Container from "../ui/container";
import Section from "../ui/section";

const benefits = [
  { icon: Check, text: "Crie sua conta gratuitamente" },
  { icon: User, text: "Crie seu perfil de entusiasta" },
  { icon: HeartIcon, text: "Demonstre seu amor pelos felinos" },
  { icon: Book, text: "Aprenda dicas e cuidados felinos" },
  { icon: MessageSquare, text: "Troque experiências na comunidade" },
];

export default function DonthaveCat() {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-[#FAF3EB] shadow-md">
          <div className="relative flex min-h-[460px] w-full items-center px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
            <Image
              src="/img/gatos/nocat.png"
              alt="Ilustração de pessoa com gato"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1280px"
              className="pointer-events-none select-none object-cover object-left opacity-20 sm:opacity-30 lg:opacity-100"
            />

            <div className="relative z-10 flex w-full flex-col items-center text-center lg:items-start lg:pl-[42%] lg:text-left xl:pl-[45%]">
              <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                Não tem gato?{" "}
                <span className="text-primary block sm:inline">
                  Não tem problema!
                </span>
              </h2>

              <p className="mt-2 text-xl font-extrabold tracking-tight text-foreground sm:text-2xl md:text-3xl">
                Você também é muito bem vindo aqui!
              </p>

              <p className="mt-3 max-w-xl text-sm font-semibold leading-relaxed text-muted-foreground sm:text-base md:text-lg">
                todos que amam gatos têm espaço.
                <br className="hidden sm:block" />
                Explore, aprenda, divirta-se e faça parte da nossa comunidade!
              </p>

              <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <li
                      key={index}
                      className="flex items-center gap-2.5 rounded-full border border-border/80 bg-white px-4 py-2.5 text-xs font-bold text-foreground shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md sm:text-sm"
                    >
                      <Icon className="size-4 shrink-0 text-primary sm:size-4.5" />
                      <span>{benefit.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
