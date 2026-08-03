import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden md:min-h-190 lg:min-h-195">
      <Image
        src="/img/hero/cathero.png"
        alt="Gato descansando sobre um cobertor"
        fill
        priority
        sizes="100vw"
        className="-z-20 hidden object-cover object-center md:block pointer-events-none select-none"
      />

      <Image
        src="/img/hero/heromobile.png"
        alt="Gato descansando sobre um cobertor"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center md:hidden pointer-events-none select-none"
      />

      <div className="absolute inset-0 -z-10 bg-linear-to-b from-black/5 via-transparent via-35% to-[#9f3425]/95 pointer-events-none select-none" />

      <div className="mx-auto flex w-full max-w-7xl justify-center px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] sm:px-8 sm:pb-16 lg:pb-14">
        <div className="flex w-full max-w-5xl flex-col items-center text-center">
          <Image
            src="/img/logo/catslogodois.png"
            alt="Cats"
            width={250}
            height={160}
            className="mb-4 h-auto w-28 object-contain brightness-0 invert sm:w-36"
          />

          <h1 className="font-nunito max-w-4xl text-balance text-[clamp(2.2rem,10vw,2.8rem)] leading-[1.05] font-extrabold tracking-tight text-white drop-shadow-[0_3px_10px_rgba(90,32,23,0.35)] sm:text-5xl lg:text-[64px]">
            <span className="md:block">Conecte-se com quem</span>{" "}
            <span className="md:block">
              <span className="text-[#ffd3a6]">ama gatos</span> como você
            </span>
          </h1>

          <p className="mt-5 max-w-[360px] text-pretty text-[15px] leading-6 text-white/90 sm:max-w-2xl sm:text-lg sm:leading-7">
            Compartilhe momentos, conheça outros apaixonados por gatos e faça
            parte de uma comunidade criada especialmente para você.
          </p>

          <div className="mt-7 flex w-full flex-col items-center justify-center gap-3 sm:mt-8 sm:w-auto sm:flex-row">
            <Link
              href="/register"
              className="flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-3 font-bold text-[#9f3425] shadow-lg transition duration-200 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-xl focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none active:scale-[0.98] sm:w-auto"
            >
              Criar uma conta
              <ArrowRight size={19} />
            </Link>

            <Link
              href="/explorar"
              className="flex min-h-13 w-full items-center justify-center rounded-full border border-white/60 bg-white/10 px-8 py-3 font-semibold text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:ring-4 focus-visible:ring-white/40 focus-visible:outline-none active:scale-[0.98] sm:w-auto"
            >
              Explorar a comunidade
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
