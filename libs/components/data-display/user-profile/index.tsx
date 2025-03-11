import React from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';
import { User } from '@types/user';
import Avatar from '../avatar';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  user: User;
}

export const UserProfile: React.FC<Props> = ({ user, ...props }: Props) => {
  return (
    <Link className={styles['user-profile']} href="/app/profile" {...props}>
      <div className={styles['text-info']}>
        <span><strong>Logged in as</strong> <br /> {user.username}</span>
      </div>
      <Avatar name={`${user.firstName} ${user.lastName}`} imagePath={user.imageUrl} size='60px'/>
    </Link>
  );
};

UserProfile.displayName = 'UserProfile';

export default UserProfile;
