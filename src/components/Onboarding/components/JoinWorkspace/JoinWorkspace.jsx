import React, { useState, useEffect } from 'react';
import to from 'await-to-js';
import { Link, useNavigate } from 'react-router-dom';
import { Skeleton, useToast } from '@chakra-ui/react';

import WorkspaceItem from './components/WorkspaceItem/WorkspaceItem';
import { getUserWorkspaces } from './services/getUserWorkspaces';
import {
  workspaceIdLocalStorageKey, handleWorkspaceSelect
} from '../../../../services/workspace';
import { useCurrentUser } from '../../../../hooks/useCurrentUser';

import styles from './join-workspace.module.scss';

export default function JoinWorkspace() {
  const toast = useToast();
  const navigate = useNavigate();
  const { state } = useCurrentUser();
  const { user } = state;
  const workspaceId = localStorage.getItem(workspaceIdLocalStorageKey);
  const [isLoading, setIsLoading] = useState(false);
  const [userWorkspaces, setUserWorkspace] = useState([]);

  /**
   * Fetch user workspaces
   */
  useEffect(() => {
    if (workspaceId) navigate('/');

    proceedUserWorkspaces();
  }, []);

  /**
   * Get workspaces user has access to
   * @returns {Promise<string|number>}
   */
  async function proceedUserWorkspaces() {
    setIsLoading(true);

    const [err, res] = await to(getUserWorkspaces());

    setIsLoading(false);

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    setUserWorkspace(res);
  }

  return (
    <div className={styles.page}>
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.title}>
              👋 Welcome to Spectrum, {user?.fullName}
            </div>
            <div className={styles.subTitle}>
              Click below to join a workspace, or <Link className={styles.createNewText} to='/onboarding/create'>create
              a new workspace</Link>
            </div>
          </div>
          <div className={styles.workspacesWrapper}>
            <div className={styles.title}>Your workspaces</div>
            <div className={styles.workspacesContainer}>
              {isLoading ? [...Array(3).keys()].map((index) =>
                <Skeleton key={index}><WorkspaceItem />)</Skeleton>) : userWorkspaces.map(({ id, name }) => <WorkspaceItem key={id}
                                                                                                               name={name}
                                                                                                               onClick={() => handleWorkspaceSelect(id)} />)}
            </div>
          </div>
          <div className={styles.footerInfoContainer}>
            By joining a workspace you are agreeing with the <Link className={styles.termsOfServiceText}>Terms of
            Service</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
