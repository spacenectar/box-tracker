"use client";

import { SignUp } from "@clerk/nextjs";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import styles from "./styles.module.scss";

export default function RegisterPage() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isSignedIn) {
      router.push("/app");
    }
  }, [isSignedIn, router]);

  return (
    <div className="dashboard-layout">
      <SignUp 
        path="/register" 
        appearance={{
          elements: {
            cardBox: styles["card-box"],
            socialButtonsProviderIcon: styles["social-buttons-provider-icon"],
            formFieldLabel: styles["form-field-label"],
            formFieldInput: styles["form-field-input"],
          }
        }}
        fallbackRedirectUrl="/"
        signInUrl="/login"
      />
    </div>
  );
}
