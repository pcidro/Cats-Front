import Image from "next/image";
import Container from "../ui/container";
import Section from "../ui/section";
import Title from "../ui/title";

const functionalities = [
  {
    title: "Seu perfil",
    description:
      "Conte sua história, apresente seus felinos e conecte-se com outros tutores.",
    image: "/img/gatos/personprofile.png",
    alt: "Perfil de uma tutora na plataforma Cats",
  },
  {
    title: "Todos os seus gatos",
    description:
      "Cadastre seus gatos e compartilhe suas características, costumes e manias.",
    image: "/img/gatos/mycatsprofilee.jpg",
    alt: "Lista de gatos cadastrados por uma pessoa",
  },
  {
    title: "Perfil para cada gato",
    description:
      "Crie um espaço exclusivo para cada gato, com fotos, informações e personalidade.",
    image: "/img/gatos/perfilgato.jpeg",
    alt: "Perfil individual de um gato",
  },
  {
    title: "Compartilhe momentos",
    description:
      "Publique fotos especiais e receba curtidas e comentários da comunidade.",
    image: "/img/gatos/catpublication.jpeg",
    alt: "Publicação com a foto de um gato",
  },
  {
    title: "Feed da comunidade",
    description:
      "Acompanhe as publicações recentes e descubra novos momentos felinos.",
    image: "/img/gatos/feedimg.jpg",
    alt: "Feed de publicações da comunidade Cats",
  },
  {
    title: "Descubra novos gatos",
    description:
      "Encontre perfis populares e conheça novos amigos felinos todos os dias.",
    image: "/img/gatos/findcats.jpeg",
    alt: "Lista de gatos populares na plataforma",
  },
];

export default function Funcionalities() {
  return (
    <Section className="bg-[url('/img/background/catsbackground.png')] bg-cover bg-center bg-no-repeat">
      <Container>
        <div className="mx-auto text-center lg:mb-12">
          <Title>Funcionalidades que aproximam você dos gatos</Title>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            Crie perfis, compartilhe momentos e descubra uma comunidade inteira
            apaixonada por gatos.
          </p>
        </div>

        <ul className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {functionalities.map((functionality) => (
            <li
              key={functionality.title}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-sm"
            >
              <div className="relative h-64 border-b border-border bg-secondary/20 sm:h-72 lg:h-80">
                <Image
                  src={functionality.image}
                  alt={functionality.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain object-top"
                />
              </div>

              <div className="flex flex-1 flex-col items-center p-6 text-center">
                <h3 className="text-lg font-bold text-foreground md:text-xl">
                  {functionality.title}
                </h3>

                <p className="mt-3 max-w-sm leading-relaxed text-muted-foreground">
                  {functionality.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
