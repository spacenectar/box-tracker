import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

import Logo from '@assets/branding/box-tracker-logo-white.svg'

const Masthead: React.FC = () => {
  return (
    <header className={styles.masthead}>
      <div className={styles.logo}>
        <Link href="/">
          <h1>
            <Image src={Logo} alt="Box Tracker Logo" width={50} height={50} />
            <span className='title'>Box Tracker</span>
          </h1>
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/">
              Home
            </Link>
          </li>
          <li>
            <Link href="/about">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Masthead;
