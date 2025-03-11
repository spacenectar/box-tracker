import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { User } from '@types/user';
import { SignOutButton } from "@clerk/nextjs";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  user?: User;
  navItems: Array<{
    label: string;
    href: string;
  }>;
}

export const Navigation: React.FC<Props> = ({ user, navItems, ...props }: Props) => {
  return (
    <nav className={styles.nav} {...props}>
      <ul>
        {navItems.map((item) => (
          <li key={item.label}>
            <Link
              className={styles['nav-item']}
              href={item.href}>
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
  );
};

Navigation.displayName = 'Navigation';

export default Navigation;
