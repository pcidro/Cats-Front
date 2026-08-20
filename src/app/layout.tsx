import type { Metadata } from "next";
import { Nunito, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { getUser } from "@/utils/getuser";
import { UserContextProvider } from "@/context/userContext";
import Footer from "@/components/home/Footer";
import { Toaster } from "sonner";

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
  post,
}: Readonly<{
  children: React.ReactNode;
  post: React.ReactNode;
}>) {
  const user = await getUser();
  return (
    <html lang="pt-BR" className={`${nunito.variable} ${nunitoSans.variable}`}>
      <body className="font-sans">
        <UserContextProvider user={user}>
          <div className="flex flex-col min-h-[calc(100vh+10rem)]">
            <Header />
            <main className="pb-24 md:pb-0 flex-1 ">
              {children}
              <div>{post}</div>
            </main>
            <Footer />
          </div>
          <Toaster
            position="bottom-left"
            gap={8}
            toastOptions={{
              duration: 4000,
              className:
                "!bg-[#302b29] !text-white !border-0 !rounded-lg !shadow-lg !px-4 !py-3 !text-sm",
            }}
          />
        </UserContextProvider>
      </body>
    </html>
  );
}
