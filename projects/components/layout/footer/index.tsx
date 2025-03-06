import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';

import Logo from '@assets/branding/box-tracker-logo-white.svg'

const navItems = [
  {
    label: 'Links pending',
    href: '/'
  }
];

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['top-bar']}>
        <Link href="/" className={styles.logo}>
          <Image src={Logo} alt="Box Tracker Logo" width={18} height={18} />
          <span className={styles.title}>Box Tracker</span>
        </Link>
        <nav className={styles.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                className={styles['nav-item']}
                href={item.href }>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles['bottom-bar']}>
        <p className={styles.copyright}>&copy; {new Date().getFullYear()} Alexander Foxleigh</p>
      </div>
    </footer>
  );
};

export default Footer;
