import React from 'react';
import { Link } from 'react-router-dom';

import styles from './workspace-item.module.scss';

export default function WorkspaceItem(props) {
  const { name, membersNumber } = props;

  return (
    <Link className={styles.workspaceItemContainer}>
      <div className={styles.iconContainer}>
        <div className={styles.iconText}>
          W
        </div>
      </div>
      <div className={styles.workspaceInfoContainer}>
        <div className={styles.name}>
          {name}
        </div>
        <div className={styles.membersNumber}>
          {membersNumber} {membersNumber > 1 ? 'members' : 'member'}
        </div>
      </div>
    </Link>
  );
}
