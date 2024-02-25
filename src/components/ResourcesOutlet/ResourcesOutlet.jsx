import React from 'react';
import { Outlet, useParams } from 'react-router-dom';

import styles from './resources-outlet.module.scss';

export default function ResourcesOutlet(props) {
  let { id } = useParams();
  const isNew = id === 'new';

  /**
   * Get ResourcesOutlet header text depending on url params
   * @returns {string}
   */
  function getResourceOutletHeaderText() {
    if (!id) return 'Resources';

    if (isNew) return 'Create resource';

    return 'Update resource'
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
