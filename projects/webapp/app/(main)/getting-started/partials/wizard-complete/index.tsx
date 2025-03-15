'use client';
import Link from 'next/link';
import styles from './style.module.scss';

export const WizardComplete = () => {
  return (
    <div className={styles.container}>
      <h2>Setup Already Complete</h2>
      <p>You already have spaces and locations set up in your account.</p>
      <Link href="/" className={styles.link}>
        Return to Dashboard
      </Link>
    </div>
  );
};
