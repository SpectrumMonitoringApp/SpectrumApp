import React from 'react';
import { Link } from 'react-router-dom';
import { UpDownIcon } from '@chakra-ui/icons';

import styles from './current-workspace.module.scss';

export default function CurrentWorkspace(props) {
  const { workspaceName } = props;

  return (
    <div className={styles.currentWorkspaceContainer}>
      <div className={styles.workspaceInfoContainer}>
        <div className={styles.workspaceIcon}>
          <div className={styles.iconText}>
            {workspaceName?.[0]}
          </div>
        </div>
        <div className={styles.workspaceName}>{workspaceName.substring(0, 10) + '...'}</div>
      </div>
      <Link className={styles.changeIconContainer} to='/onboarding/join'><UpDownIcon boxSize={3} /></Link>
    </div>
  );
}
