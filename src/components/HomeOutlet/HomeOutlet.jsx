import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import HomeSidebar from './components/HomeSidebar/HomeSidebar';
import { workspaceIdLocalStorageKey } from '../../services/workspace';

import styles from './home-outlet.module.scss';

export default function HomeOutlet(props) {
  const navigate = useNavigate();
  const workspaceId = localStorage.getItem(workspaceIdLocalStorageKey);

  useEffect(() => {
    if (!workspaceId) navigate('/onboarding/join');
  }, [workspaceId]);

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
