import React from 'react';
import { Input } from '@chakra-ui/react';

import styles from './spectrum-input-block.module.scss';

export default function SpectrumInputBlock(props) {
  const { label } = props;

  return (
    <div className={styles.inputBlock}>
      <div className={styles.inputLabel}>{label}</div>
      <Input {...props} />
    </div>
  );
}
