import React from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';

import styles from './resources-outlet.module.scss';

export default function ResourcesOutlet(props) {
  const { pathname } = useLocation();
  let { id } = useParams();
  const isNew = pathname.endsWith('/new');

  /**
   * Get ResourcesOutlet header text depending on url params
   * @returns {string}
   */
  function getResourceOutletHeaderText() {
    if (pathname.endsWith('/new')) return 'Create resource';

    if (!id) return 'Resources';

    if (pathname.endsWith('/edit')) return 'Update resource';

    return 'Resource dashboard';
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>{getResourceOutletHeaderText()}</div>
      <div className={styles.outletContainer}>
        <Outlet context={{ id, isNew }} />
      </div>
    </div>
  );
}
