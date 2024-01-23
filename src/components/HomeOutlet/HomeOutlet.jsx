import React from 'react';
import { Outlet } from 'react-router-dom';

import HomeSidebar from './components/HomeSidebar/HomeSidebar';

import styles from './home-outlet.module.scss';

export default function HomeOutlet(props) {
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
