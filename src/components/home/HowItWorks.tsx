import Image from "next/image";
import Link from "next/link";
import Container from "../ui/container";
import Section from "../ui/section";
import Title from "../ui/title";

const steps = [
  {
    number: "01",
    title: "Crie sua conta",
    description:
      "Cadastre-se gratuitamente e prepare seu espaço dentro da comunidade Cats.",
    image: "/img/how-it-works/createaccount.png",
    alt: "Tela de criação de conta no Cats",
  },
  {
    number: "02",
    title: "Cadastre seus gatos",
    description:
      "Crie um perfil especial para cada gatinho e compartilhe sua personalidade.",
    image: "/img/how-it-works/registercats2.png",
    alt: "Perfis de gatos cadastrados no Cats",
  },
  {
    number: "03",
    title: "Compartilhe momentos",
    description:
      "Publique fotos, receba ronrons e interaja com outros amantes de gatos.",
    image: "/img/how-it-works/sharemoments2.png",
    alt: "Publicação com fotos de gatos no Cats",
  },
];

export default function HowItWorks() {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <Title>Como funciona?</Title>

          <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
            Em poucos passos, você cria seu perfil, cadastre seus gatos e começa
            a fazer parte da comunidade.
          </p>
        </div>

        <div className="relative mt-12 grid items-stretch gap-6 md:grid-cols-3">
          <div className="absolute top-32 right-[16%] left-[16%] hidden h-px bg-primary/20 md:block" />

          {steps.map((step) => (
            <article
              key={step.number}
              className="group relative z-10 flex h-full flex-col rounded-3xl border border-border bg-surface p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg md:p-6"
            >
              <div className="relative mb-6 pr-7">
                <span className="absolute top-0 right-0 text-sm font-extrabold text-primary/50">
                  {step.number}
                </span>

                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-primary/15 bg-background shadow-sm">
                  <Image
                    src={step.image}
                    alt={step.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
              </div>

              <div className="mt-auto text-center">
                <h3 className="font-nunito text-xl font-extrabold text-foreground md:text-2xl">
                  {step.title}
                </h3>

                <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
