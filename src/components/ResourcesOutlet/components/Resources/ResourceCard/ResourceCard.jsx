import React from 'react';
import { Link } from 'react-router-dom';

import styles from './resource-card.module.scss';

export default function ResourceCard(props) {
  const { id, name, type, pollInterval } = props;
  return (
    <Link className={styles.container} to={`/resources/${id}`}>
      <div className={styles.name}>{name}</div>
      <div className={styles.resourceInfoContainer}>
        <div className={styles.resourceInfo}>{type} | {pollInterval || '-'}</div>
      </div>
    </Link>
  );
}
