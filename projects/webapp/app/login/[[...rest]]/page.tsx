"use client";

import { SignIn } from "@clerk/nextjs";

import styles from "./styles.module.scss";

export default function LoginPage() {
  return (
    <div className="dashboard-layout">
      <SignIn path="/login" appearance={
        {
          elements: {
            cardBox: styles['card-box'],
            socialButtonsProviderIcon: styles['social-buttons-provider-icon'],
            formFieldLabel: styles['form-field-label'],
            formFieldInput: styles['form-field-input'],
          }
        }
      }/>
    </div>
  );
}
