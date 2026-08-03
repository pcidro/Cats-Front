import Image from "next/image";

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="flex min-h-dvh items-center justify-center bg-background px-4 py-8 lg:px-8"
      style={{
        backgroundImage: "url('/img/background/auth-background.png')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="grid w-full max-w-310 overflow-hidden rounded-4xl border border-border bg-surface shadow-[0_24px_70px_rgba(74,48,40,0.14)] lg:min-h-190 lg:grid-cols-2">
        <aside className="relative hidden min-h-190 overflow-hidden lg:block">
          <Image
            src="/img/logo/loginlogo.jpeg"
            alt="Gato descansando em um cobertor"
            fill
            priority
            sizes="50vw"
            className="object-cover object-center"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 25%, rgba(201,79,58,0.05) 48%, rgba(201,79,58,0.9) 100%)",
            }}
          />

          <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-12 pb-12 text-center xl:px-14 xl:pb-14">
            <Image
              src="/img/logo/catslogodois.png"
              alt="Cats"
              width={250}
              height={250}
              className="h-auto w-40 object-contain brightness-0 invert"
            />

            <h2 className="font-nunito max-w-md text-[42px] font-bold leading-[0.98] text-white xl:text-[48px]">
              Bem-vindo a
              <br />
              comunidade felina.
            </h2>

            <p className="mt-6 max-w-md text-[17px] leading-7 text-white/90">
              Crie sua conta e comece a compartilhar momentos incríveis com seu
              gato e com quem ama tanto gatos quanto você.
            </p>
          </div>
        </aside>

        <section className="flex items-center justify-center">
          {children}
        </section>
      </div>
    </main>
  );
}
