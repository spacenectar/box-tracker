import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './styles.module.scss';
import { User } from '@types/user';
import { SignOutButton } from "@clerk/nextjs";

import Logo from '@assets/branding/box-tracker-logo-white.svg'
import Avatar from '../../data-display/avatar';

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
        <div>
          {user ? (
            <Link className={styles['user-info']} href="/app/profile">
              <div className={styles['text-info']}>
                <span><strong>Logged in as</strong> <br /> {user.username}</span>
              </div>
              <Avatar name={`${user.firstName} ${user.lastName}`} imagePath={user.imageUrl} size='60px'/>
            </Link>
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
        </div>
      </div>
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
          {user && (
            // @ts-expect-error 2322 - Classname isn't on props but it does work
            <SignOutButton className="btn-tertiary" redirectUrl='/'/>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Masthead;
