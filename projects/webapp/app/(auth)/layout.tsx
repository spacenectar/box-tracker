'use client'

import { AuthLayout } from "../auth-layout";

export default function AuthPagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
