
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Archivo, Archivo_Black, Archivo_Narrow } from "next/font/google";
import StoreProvider from "./store-provider";
import "@theme/index.scss";

const ArchivoFont = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const ArchivoBlackFont = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const ArchivoNarrowFont = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Box Tracker",
  description: "The ultimate moving companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
        variables: {
          fontSize: "1.6rem",
        },
      }}>
      <html lang="en">
        <body className={`${ArchivoFont.variable} ${ArchivoBlackFont.variable} ${ArchivoNarrowFont.variable}`}>
          <StoreProvider>
            {children}
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}


