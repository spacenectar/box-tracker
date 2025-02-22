import React from 'react';

import styles from './styles.module.css';

import { version } from '../version';

// Render component
export const Version: React.FC = () => {
  if (version.outdated) {
    return (
      <div className={styles['outdated']}>
        <p className={styles['version__title']}>
          <div className={styles['version__icon']}>💔</div>
          Your version of Jackanory is out of date!
          <div className={styles['version__icon']}>💔</div>
        </p>
        <p className={styles[`version__instructions`]}>
          You are running <em>v{version.current}</em>, the latest version is{' '}
          <em>v{version.latest}</em>. <br /> Please run{' '}
          <code>yarn wsupdate</code> to update.
        </p>
      </div>
    );
  }
  return (
    <div className={styles['up-to-date']}>
      <p className={styles['version__title']}>
        <div className={styles['version__icon']}>🎉</div>
        You are running the latest version of Jackanory!
        <div className={styles['version__icon']}>🎉</div>
      </p>
    </div>
  );
};

export default Version;
