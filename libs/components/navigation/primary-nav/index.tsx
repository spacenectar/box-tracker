import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './style.module.scss';
import { User } from '@typeDefs/user';
import { SignOutButton } from "@clerk/nextjs";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  user?: User;
  navItems: Array<{
    label: string;
    href: string;
  }>;
}

export const PrimaryNav: React.FC<Props> = ({ user, navItems, ...props }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside the navigation menu
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    // Only process if menu is open and click is outside the nav element
    if (isOpen && navRef.current && !navRef.current.contains(event.target as HTMLElement)) {
      setIsOpen(false);
    }
  }, [isOpen]);
  
  // Toggle body scroll based on menu state
  const bodyStyle = isOpen ? { overflow: 'hidden' } : { overflow: 'auto' };
  
  // Toggle menu open/closed
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div onClick={handleClick}>
      <button 
        className={`${styles['burger-menu']} ${isOpen ? styles.active : ''}`} 
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <div 
        ref={navRef}
        style={bodyStyle}
        className={`${styles['nav-container']} ${isOpen ? styles.open : ''}`}
      >
        <nav className={styles.navigation} {...props}>
          <ul className={styles['nav-list']}>
            {navItems.map((item, index) => (
              <li key={index} className={styles['nav-item']}>
                <Link href={item.href} className={styles['nav-link']}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          {user && (
            <div className={styles['user-section']}>
              <div className={styles['user-info']}>
                <span className={styles.username}>{user.firstName} {user.lastName}</span>
                <span className={styles.email}>{user.email}</span>
              </div>
              <SignOutButton>
                <button className={styles['sign-out']}>Sign Out</button>
              </SignOutButton>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

PrimaryNav.displayName = 'PrimaryNav';

export default PrimaryNav;
