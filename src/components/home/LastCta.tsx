import Link from "next/link";
import Container from "../ui/container";
import Section from "../ui/section";
import { PawPrint } from "lucide-react";

export default function LastCta() {
  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-[#ee6550] shadow-md">
          <img
            src="/img/gatos/lastcta.png"
            alt="Ilustração de gato convidando a criar conta"
            className="absolute inset-0 w-full h-full object-cover object-left pointer-events-none select-none opacity-30 sm:opacity-40 lg:opacity-100"
          />
          <div className="relative z-10 flex flex-col items-center px-6 py-10 text-center sm:px-10 sm:py-14 lg:items-start lg:py-16 lg:pl-[38%] lg:text-left">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl">
              Faça parte da nossa comunidade felina!
            </h2>
            <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-white/90 sm:text-base md:text-lg">
              Junte-se a milhares de amantes de gatos. Compartilhe fotos,
              aprenda dicas e conecte-se com outros tutores.
            </p>
            <Link
              className="mt-10 bg-white py-3 px-6 text-sm font-bold text-primary shadow-sm transition-all hover:bg-neutral-50 hover:scale-105 active:scale-95 sm:px-8 sm:py-3.5 sm:text-base rounded-2xl flex items-center gap-2"
              href="/register"
            >
              <PawPrint />
              Criar minha conta gratuitamente
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
