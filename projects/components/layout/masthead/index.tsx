import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';
import { User } from '@types/user';

import Logo from '@assets/branding/box-tracker-logo-white.svg'

export interface Props extends React.HTMLAttributes<HTMLElement> {
  user: User
}

const navItems = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'About',
    href: '/about'
  },
  {
    label: 'Contact',
    href: '/contact'
  }
];

export const Masthead: React.FC<Props> = ({ user, ...props }: Props) => {
  return (
    <header className={styles.masthead} {...props}>
        <h1>
          <Link href="/" className={styles.logo}>
            <Image src={Logo} alt="Box Tracker Logo" width={50} height={50} />
            <span className={styles.title}>Box Tracker</span>
          </Link>
        </h1>
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
    </header>
  );
};

export default Masthead;
