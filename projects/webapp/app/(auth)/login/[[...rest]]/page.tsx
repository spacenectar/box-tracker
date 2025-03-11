"use client";

import { SignIn } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

export default function LoginPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  return (
    <div className="dashboard-layout">
      <SignIn path="/login" appearance={{
        elements: {
          cardBox: styles["card-box"],
          socialButtonsProviderIcon: styles["social-buttons-provider-icon"],
          formFieldLabel: styles["form-field-label"],
          formFieldInput: styles["form-field-input"],
        }
      }}
      fallbackRedirectUrl="/"
      signUpUrl="/register"
      />
    </div>
  );
}
