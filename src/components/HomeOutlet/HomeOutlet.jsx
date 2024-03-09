import React, { useEffect } from 'react';
import to from 'await-to-js';
import { Outlet, useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

import HomeSidebar from './components/HomeSidebar/HomeSidebar';
import { workspaceIdLocalStorageKey } from '../../services/workspace';
import { useWorkspaceActions } from '../../services/stores/workspace-store/workspace-store';
import { processCurrentWorkspace } from './services/processCurrentWorkspace';

import styles from './home-outlet.module.scss';

export default function HomeOutlet(props) {
  const navigate = useNavigate();
  const toast = useToast();
  const workspaceId = localStorage.getItem(workspaceIdLocalStorageKey);
  const { setWorkspace, setIsLoading } = useWorkspaceActions();

  useEffect(() => {
    if (!workspaceId) return navigate('/onboarding/join');

    processWorkspace(workspaceId);
  }, [workspaceId]);

  /**
   * Get currently selected workspace name
   * @param workspaceId
   * @returns {Promise<void>}
   */
  async function processWorkspace(workspaceId) {
    if (!workspaceId) return;

    setIsLoading(true);

    const [err, res] = await to(processCurrentWorkspace(workspaceId));

    setIsLoading(false);

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    setWorkspace(res);
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.pageContainer}>
        <div className={styles.sidebarContainer}>
          <HomeSidebar />
        </div>
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
