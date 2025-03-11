import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';
import { User } from '@typeDefs/user';

import Logo from '@assets/branding/box-tracker-logo-white.svg?url';
import UserProfile from '../../data-display/user-profile';
import Navigation from '../navigation';

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
      <div className={styles['top-bar']}>
        <h1>
          <Link href="/" className={styles.logo}>
            <Image src={Logo} alt="Box Tracker Logo" width={50} height={50} />
            <span className={styles.title}>Box Tracker</span>
          </Link>
        </h1>
        <div className={styles['user-nav-container']}>
          {user ? (
            <UserProfile user={user} />
          ) : (
            <div className={styles['user-info']}>
              <Link href="/login" className='btn-primary'>
                <span>Sign in</span>
              </Link>
              <Link href="/register" className='btn-tertiary'>
                <span>Register</span>
              </Link>
            </div>
          )}
          <Navigation user={user} navItems={navItems} />
        </div>
      </div>
    </header>
  );
};

Masthead.displayName = 'Masthead';

export default Masthead;
