type TitleProps = {
  children: React.ReactNode;
};

export default function Title({ children }: TitleProps) {
  return (
    <h1 className="text-2xl font-nunito md:text-4xl font-extrabold tracking-tight text-foreground text-center mb-4">
      {children}
    </h1>
  );
}
