"use client";

import { UserProfile } from "@clerk/nextjs";

import { Icon } from "@components/data-display/icon";
import ManageSpaces from "./partials/manage-spaces";

import styles from "./styles.module.scss";

export default function ProfilePage() {
  return (
    <div className={["flex ta-c items-center content-center h-full w-full", styles['profile-page']].join(' ')}>
      <UserProfile appearance={
        {
          elements: {
            cardBox: styles['card-box'],
            socialButtonsProviderIcon: styles['social-buttons-provider-icon'],
            formFieldLabel: styles['form-field-label'],
            formFieldInput: styles['form-field-input'],
            navbar: styles['navbar'],
            navbarButtonIcon: styles['navbar-button-icon'],
          }
        }
      }>
        <UserProfile.Page label="Manage spaces" url="/app/profile/manage-spaces" labelIcon={<Icon use="briefcase" />}>
          <div className={styles['page-content']}>
            <h1 className="heading-small">Manage spaces</h1>
            <p>Spaces are where you can organise your locations, boxes and items.</p>
            <ManageSpaces />
          </div>
        </UserProfile.Page>
        <UserProfile.Page label="Manage Users" url="/app/profile/manage-users" labelIcon={<Icon use="users" />}>
          <div className={styles['page-content']}>
            <h1 className="heading-small">Manage users</h1>
            <p>Add and remove existing Box Tracker users to your account and give them access to one or more spaces or locations</p>
          </div>
        </UserProfile.Page>
      </UserProfile>
    </div>
  );
}
