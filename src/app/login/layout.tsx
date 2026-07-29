import Image from "next/image";

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen">
      <div className="relative hidden lg:block lg:w-1/2">
        <Image
          src="/img/loginimg.png"
          alt="Gato atravessando um fundo de papel"
          fill
          priority
          className="object-cover"
        />
      </div>

      <section className="flex w-full items-center justify-center px-8 lg:w-1/2">
        {children}
      </section>
    </main>
  );
}
