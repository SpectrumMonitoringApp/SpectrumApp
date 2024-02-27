import React from 'react';

import { Input, Select, Switch } from '@chakra-ui/react';
import { pollIntervalValues } from '../../../../services/constants';

import styles from './generic-resource-details.module.scss';
export const pollIntervals = [{ value: pollIntervalValues['1m'], label: '1m' }, {
  value: pollIntervalValues['5m'],
  label: '5m'
}, { value: pollIntervalValues['15m'], label: '15m' }];


export default function GenericResourceDetails(props) {
  const { isNew, pollInterval, resourceName, isActive, onResourceNameChange, onIsActiveChange, onPollIntervalChange} = props;

  return (
    <div className={styles.formDateContainer}>
      <Input placeholder='Name' onChange={onResourceNameChange} value={resourceName}/>
      <div className={styles.isActiveSwitchContainer}>
        <div className={styles.text}>Set resource active?</div>
        <Switch onChange={onIsActiveChange} checked={isActive}/>
      </div>
      <div className={styles.pollIntevalContainer}>
        <div className={styles.text}>How often should we poll the resource?</div>
        <Select value={pollInterval} onChange={onPollIntervalChange}>
          {pollIntervals.map(({ value, label }) => <option value={value}>{label}</option>)}
        </Select>
      </div>
    </div>
  );
}
