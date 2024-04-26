import React from 'react';

import { Input, Select, Switch } from '@chakra-ui/react';
import { pollIntervalValues } from '../../../../services/constants';

import styles from './generic-resource-details.module.scss';

export const pollIntervals = [{ value: pollIntervalValues['10m'], label: '10m' }, {
  value: pollIntervalValues['30m'],
  label: '30m'
}, { value: pollIntervalValues['1h'], label: '1h' }];


export default function GenericResourceDetails(props) {
  const {
    isNew,
    pollInterval,
    resourceName,
    isActive,
    onResourceNameChange,
    onIsActiveChange,
    onPollIntervalChange,
    isSwitchLoading,
    isPollIntervalLoading
  } = props;

  return (
    <div className={styles.formDateContainer}>
      <Input placeholder='Name' onChange={onResourceNameChange} value={resourceName} />
      <div className={styles.isActiveSwitchContainer}>
        <div className={styles.text}>Set resource active?</div>
        <Switch onChange={onIsActiveChange} isChecked={isActive} isDisabled={isSwitchLoading} />
      </div>
      <div className={styles.pollIntevalContainer}>
        <div className={styles.text}>How often should we poll the resource?</div>
        <Select value={pollInterval} onChange={onPollIntervalChange} isDisabled={isPollIntervalLoading}>
          {pollIntervals.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
        </Select>
      </div>
    </div>
  );
}
