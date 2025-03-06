"use client";

import { UserProfile } from "@clerk/nextjs";

import styles from "./styles.module.scss";

export default function ProfilePage() {
  return (
    <div className={["dashboard-layout", styles['profile-page']].join(' ')}>
      <UserProfile appearance={
        {
          elements: {
            cardBox: styles['card-box'],
            socialButtonsProviderIcon: styles['social-buttons-provider-icon'],
            formFieldLabel: styles['form-field-label'],
            formFieldInput: styles['form-field-input'],
            navbar: styles['navbar'],
          }
        }
      }/>
    </div>
  );
}
