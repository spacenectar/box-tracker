import React, { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { User } from '@typeDefs/user';
import { SignOutButton } from "@clerk/nextjs";

export interface Props extends React.HTMLAttributes<HTMLElement> {
  user?: User;
  navItems: Array<{
    label: string;
    href: string;
  }>;
}

export const Navigation: React.FC<Props> = ({ user, navItems, ...props }: Props) => {
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
        <nav className={styles.nav} {...props}>
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  className={styles['nav-item']}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {user && (
              <li>
                <div className={styles['sign-out-button-wrapper']}>
                  <SignOutButton>
                    <button type="button" className={styles['sign-out-button']}>Sign Out</button>
                  </SignOutButton>
                </div>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

Navigation.displayName = 'Navigation';

export default Navigation;
