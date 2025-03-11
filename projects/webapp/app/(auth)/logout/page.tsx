"use client";

import { SignOutButton } from "@clerk/nextjs";
import styles from "./styles.module.scss";

export default function LogoutPage() { 
  return (
    <div className={styles["logout-container"]}>
      <h1>Sign Out</h1>
      <p>Click the button below to sign out of your account.</p>
      <SignOutButton redirectUrl="/">
        <button className={styles["sign-out-button"]}>Sign Out</button>
      </SignOutButton>
    </div>
  );
}
