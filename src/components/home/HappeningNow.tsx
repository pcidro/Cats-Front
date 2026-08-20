import Image from "next/image";
import Link from "next/link";
import { MessageCircle, PawPrint } from "lucide-react";
import Container from "../ui/container";
import Section from "../ui/section";
import Title from "../ui/title";

export default function HappeningNow() {
  return (
    <Section>
      <Container>
        <Title>Veja o que está acontecendo agora</Title>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <li className="w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link
              href="/post/f5a63a95-4717-48a7-9b67-45ad3f5b4c91"
              className="group block"
            >
              <article>
                <header className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 rounded-full">
                      <Image
                        className="size-11 rounded-full object-cover ring-2 ring-primary/15 ring-offset-2 ring-offset-surface transition hover:ring-primary/40"
                        src="/img/gatos/biscoitocat.png"
                        alt="Foto de perfil do Biscoito"
                        width={44}
                        height={44}
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground transition group-hover:text-primary">
                        Biscoito
                      </h3>

                      <p className="text-xs text-muted-foreground">@biscoito</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">Há 2 horas</p>
                </header>

                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    src="/img/gatos/biscoitocat.png"
                    alt="Biscoito aproveitando o sol da tarde"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                  />
                </div>

                <div className="px-4 py-4">
                  <p className="mb-4 text-sm leading-relaxed text-foreground/80">
                    <strong className="mr-1 font-bold text-foreground">
                      Biscoito
                    </strong>
                    Aproveitando o sol da tarde ☀️
                  </p>

                  <div className="flex items-center gap-2 border-t border-border/70 pt-3">
                    <span className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition group-hover:text-primary">
                      <PawPrint className="size-5" strokeWidth={1.8} />
                      <span>124</span>
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition group-hover:text-primary">
                      <MessageCircle className="size-5" strokeWidth={1.8} />
                      <span>2</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </li>

          <li className="w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link
              href="/post/d17f1b84-a7c1-411c-a865-d530632f02ab"
              className="group block"
            >
              <article>
                <header className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 rounded-full">
                      <Image
                        className="size-11 rounded-full object-cover ring-2 ring-primary/15 ring-offset-2 ring-offset-surface transition hover:ring-primary/40"
                        src="/img/gatos/ninacat.png"
                        alt="Foto de perfil da Nina"
                        width={44}
                        height={44}
                      />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground transition group-hover:text-primary">
                        Nina
                      </h3>

                      <p className="text-xs text-muted-foreground">@nina</p>
                    </div>
                  </div>

                  <p className="shrink-0 text-xs text-muted-foreground">
                    Há 1 hora
                  </p>
                </header>

                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    src="/img/gatos/ninacat.png"
                    alt="Nina tirando uma soneca"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                  />
                </div>

                <div className="px-4 py-4">
                  <p className="mb-4 text-sm leading-relaxed text-foreground/80">
                    <strong className="mr-1 font-bold text-foreground">
                      Nina
                    </strong>
                    Hora da soneca preferida 😴✨
                  </p>

                  <div className="flex items-center gap-2 border-t border-border/70 pt-3">
                    <span className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition group-hover:text-primary">
                      <PawPrint className="size-5" strokeWidth={1.8} />
                      <span>98</span>
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition group-hover:text-primary">
                      <MessageCircle className="size-5" strokeWidth={1.8} />
                      <span>5</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </li>
          <li className="w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
            <Link
              href="/post/c6e7a46f-7ad1-4c07-8f23-cb44a211e2a4"
              className="group block"
            >
              <article>
                <header className="flex items-center justify-between gap-3 px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="shrink-0 rounded-full">
                      <Image
                        className="size-11 rounded-full object-cover ring-2 ring-primary/15 ring-offset-2 ring-offset-surface transition hover:ring-primary/40"
                        src="/img/gatos/milocat.png"
                        alt="Foto de perfil do milo"
                        width={44}
                        height={44}
                      />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-bold text-foreground transition group-hover:text-primary">
                        Milo
                      </h3>

                      <p className="text-xs text-muted-foreground">@milo</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">Há 2 horas</p>
                </header>

                <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                  <Image
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                    src="/img/gatos/milocat.png"
                    alt="Biscoito aproveitando o sol da tarde"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                  />
                </div>

                <div className="px-4 py-4">
                  <p className="mb-4 text-sm leading-relaxed text-foreground/80">
                    <strong className="mr-1 font-bold text-foreground">
                      Milo
                    </strong>
                    Aproveitando o sol da tarde ☀️
                  </p>

                  <div className="flex items-center gap-2 border-t border-border/70 pt-3">
                    <span className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition group-hover:text-primary">
                      <PawPrint className="size-5" strokeWidth={1.8} />
                      <span>124</span>
                    </span>

                    <span className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-muted-foreground transition group-hover:text-primary">
                      <MessageCircle className="size-5" strokeWidth={1.8} />
                      <span>2</span>
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </li>
        </ul>
      </Container>
    </Section>
  );
}
