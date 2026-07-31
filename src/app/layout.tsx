import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { getUser } from "@/utils/getuser";
import { UserContextProvider } from "@/context/userContext";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cats",
  description: "Uma rede social feita para gatos.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${nunitoSans.variable}`}>
      <body className="font-sans">
        <UserContextProvider user={user}>
          <Header />
          <main className="pb-24 md:pb-0">{children}</main>
        </UserContextProvider>
      </body>
    </html>
  );
}
