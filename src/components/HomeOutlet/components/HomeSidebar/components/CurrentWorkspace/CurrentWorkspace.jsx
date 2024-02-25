import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UpDownIcon } from '@chakra-ui/icons';

import styles from './current-workspace.module.scss';
import { clearSelectedWorkspace } from '../../../../../../services/workspace';

export default function CurrentWorkspace(props) {
  const { workspaceName } = props;
  const navigate = useNavigate();

  /**
   * Clear selected workspace and redirect to page for selecting workspace
   */
  function handleChangeWorkspaceClick() {
    clearSelectedWorkspace();
    navigate('/onboarding/join')
  }

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
      <div className={styles.changeIconContainer} onClick={handleChangeWorkspaceClick}><UpDownIcon boxSize={3} /></div>
    </div>
  );
}
