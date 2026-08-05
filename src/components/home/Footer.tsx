import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-background pt-12 px-4 pb-24 md:pb-6 text-center">
      <Image
        className="mx-auto"
        src={"/img/logo/catalogo.png"}
        alt={"Logo Cats"}
        width={120}
        height={120}
      />
      <p className="mb-4 text-sm leading-relaxed text-foreground/80">
        Cats. Todos os direitos reservados
      </p>
      <p className="mb-4 text-xs leading-relaxed text-foreground/80">
        Desenvolvido por Paulo Cidro
      </p>
    </footer>
  );
}
