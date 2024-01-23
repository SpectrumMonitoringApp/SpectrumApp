import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';

import styles from './current-user-block.module.scss';

export default function CurrentUserBlock(props) {
  const currentUserFullName = 'Bohdan Mykhayliv';

  return (
    <Link className={styles.container} to='/profile'>
      <div className={styles.avatarContainer}>
        <Avatar name={currentUserFullName} size='sm' src='https://bit.ly/kent-c-dodds' />
      </div>
      <div className={styles.fullNameContainer}>
        {currentUserFullName}
      </div>
    </Link>
  );
}
