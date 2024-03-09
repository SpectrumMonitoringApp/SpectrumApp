import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';
import { UpDownIcon } from '@chakra-ui/icons';

import styles from './current-workspace.module.scss';
import { clearSelectedWorkspace } from '../../../../../../services/workspace';

export default function CurrentWorkspace(props) {
  const { workspaceName, isWorkspaceLoading } = props;
  const navigate = useNavigate();

  /**
   * Clear selected workspace and redirect to page for selecting workspace
   */
  function handleChangeWorkspaceClick() {
    clearSelectedWorkspace();
    navigate('/onboarding/join')
  }

  /**
   * Get workspace display name
   */
  function getWorkspaceName() {
    if (!workspaceName) return '';

    if (workspaceName.length <= 10) return workspaceName;

    return workspaceName.substring(0, 10) + '...';
  }

  return (
    <div className={styles.currentWorkspaceContainer}>
      <div className={styles.workspaceInfoContainer}>
        <div className={styles.workspaceIcon}>
          <div className={styles.iconText}>
            {isWorkspaceLoading ? <Spinner size='sm' /> : getWorkspaceName()?.[0]}
          </div>
        </div>
        <div className={styles.workspaceName}>{isWorkspaceLoading ? <Spinner size='sm' /> : getWorkspaceName()}</div>
      </div>
      <div className={styles.changeIconContainer} onClick={handleChangeWorkspaceClick}><UpDownIcon boxSize={3} /></div>
    </div>
  );
}
