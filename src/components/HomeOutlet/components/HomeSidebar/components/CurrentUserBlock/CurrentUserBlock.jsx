import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar } from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { LuLogOut } from 'react-icons/lu';

import { useCurrentUser } from '../../../../../../hooks/useCurrentUser';
import { workspaceIdLocalStorageKey } from '../../../../../../services/workspace';
import { spectrumAccessTokenLocalStorageKey } from '../../../../../../services/apiUrl';

import styles from './current-user-block.module.scss';

export default function CurrentUserBlock(props) {
  const { state } = useCurrentUser();
  const { user } = state;
  const navigate = useNavigate();

  /**
   * Handle user logout by removing Access Token and current Workspace from Local Storage
   */
  function handleUserLogout() {
    localStorage.removeItem(spectrumAccessTokenLocalStorageKey);
    localStorage.removeItem(workspaceIdLocalStorageKey);
    navigate('/sign-in')
  }

  return (
    <div className={styles.container}>
      <div className={styles.currentUserInformation}>
        <div className={styles.avatarContainer}>
          <Avatar name={user?.fullName} size='sm' />
        </div>
        <div className={styles.fullNameContainer}>
          {user?.fullName}
        </div>
      </div>
      <IconButton aria-label='Search database' size='sm' icon={<LuLogOut size={16} />} onClick={handleUserLogout}/>
    </div>
  );
}
