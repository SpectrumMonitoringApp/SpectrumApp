import React from 'react';
import { Link } from 'react-router-dom';

import styles from './workspace-item.module.scss';

export default function WorkspaceItem(props) {
  const { name, membersNumber, onClick } = props;

  return (
    <Link className={styles.workspaceItemContainer} to='/' onClick={onClick}>
      <div className={styles.iconContainer}>
        <div className={styles.iconText}>
          {name?.[0]}
        </div>
      </div>
      <div className={styles.workspaceInfoContainer}>
        <div className={styles.name}>
          {name}
        </div>
        {membersNumber ? <div className={styles.membersNumber}>
          {membersNumber} {membersNumber > 1 ? 'members' : 'member'}
        </div> : null}
      </div>
    </Link>
  );
}
