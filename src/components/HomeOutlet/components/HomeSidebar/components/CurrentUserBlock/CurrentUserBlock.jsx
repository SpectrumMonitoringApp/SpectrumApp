import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';

import { useCurrentUser } from '../../../../../../hooks/useCurrentUser';

import styles from './current-user-block.module.scss';

export default function CurrentUserBlock(props) {
  const { state } = useCurrentUser();
  const { user } = state;

  console.log('user: ', user);

  return (
    <Link className={styles.container} to='/profile'>
      <div className={styles.avatarContainer}>
        <Avatar name={user?.fullName} size='sm' />
      </div>
      <div className={styles.fullNameContainer}>
        {user?.fullName}
      </div>
    </Link>
  );
}
