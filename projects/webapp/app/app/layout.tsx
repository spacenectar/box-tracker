'use client'

import { ClientLayout } from "../(main)/client-layout";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
