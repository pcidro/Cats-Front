import Link from "next/link";
import Image from "next/image";
import { ArrowRight, PawPrint } from "lucide-react";
import Container from "../ui/container";
import Section from "../ui/section";
import Title from "../ui/title";

export default function KnowCommunity() {
  const cats = [
    {
      id: "idbiscoto",
      cat: "Biscoito",
      image: "/img/gatos/biscoitocat.png",
      alt: "Gato Biscoito",
      article: "o",
    },
    {
      id: "idnina",
      cat: "Nina",
      image: "/img/gatos/ninacat.png",
      alt: "Gata Nina",
      article: "a",
    },
    {
      id: "idmilo",
      cat: "Milo",
      image: "/img/gatos/milocat.png",
      alt: "Gato Milo",
      article: "o",
    },
  ];

  return (
    <Section className="overflow-hidden">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-border bg-surface px-5 py-10 shadow-sm sm:px-8 md:py-14 lg:px-12">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-secondary/30 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-10 max-w-2xl text-center">
              <div className="mb-4 flex justify-center"></div>

              <Title>Conheça um pouco da nossa comunidade</Title>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Conheça alguns dos gatinhos que já fazem parte do Cats e
                descubra suas histórias.
              </p>
            </div>

            <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {cats.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/cats/${cat.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border bg-background shadow-sm transition duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
                  >
                    <div className="relative h-72 overflow-hidden bg-secondary/20 sm:h-80">
                      <Image
                        src={cat.image}
                        alt={cat.alt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-contain object-bottom transition-transform duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    </div>

                    <div className="relative flex flex-1 flex-col items-center px-6 pb-7 text-center">
                      <div className="-mt-5 mb-3 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-md">
                        <PawPrint className="h-4 w-4" />
                      </div>

                      <h3 className="text-xl font-extrabold text-foreground">
                        {cat.cat}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        Veja as fotos e conheça um pouco mais sobre{" "}
                        {cat.article} {cat.cat}.
                      </p>

                      <span className="mt-5 flex items-center gap-2 text-sm font-bold text-primary">
                        Conhecer {cat.cat}
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
