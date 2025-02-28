import Masthead from "@components/masthead";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Box Tracker - App",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Masthead />
      {children}
    </>
  );
}
