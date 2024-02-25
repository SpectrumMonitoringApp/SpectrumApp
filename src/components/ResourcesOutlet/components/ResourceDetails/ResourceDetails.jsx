import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Select, Divider, Input, Switch } from '@chakra-ui/react';

import MySqlResourceDetails from './components/MySqlResourceDetails/MySqlResourceDetails';

import styles from './resource-details.module.scss';

const resourceTypeValues = {
  mySql: 'mySql',
  redis: 'redis'
};
const resourceTypes = [{ value: resourceTypeValues.mySql, label: 'MySQL', disabled: false }, {
  value: resourceTypeValues.redis,
  label: 'Redis',
  disabled: true
}];
const pollIntervalValues = {
  '1m': 60,
  '5m': 300,
  '15m': 900
};
const pollIntervals = [{ value: pollIntervalValues['1m'], label: '1m' }, {
  value: pollIntervalValues['5m'],
  label: '5m'
}, { value: pollIntervalValues['15m'], label: '15m' }];


export default function ResourceDetails(props) {
  const { isNew, id } = useOutletContext();
  const [resourceType, setResourceType] = useState(resourceTypes[0].value);
  const [pollInterval, setPollInterval] = useState(pollIntervals[0].value);

  function renderResourceDetailsComponent() {
    if (resourceType === resourceTypeValues.mySql) return <MySqlResourceDetails />;
  }

  return (
    <div className={styles.container}>
      <Select value={resourceType} onChange={(ev) => console.log(ev.target.value)} isDisabled={!isNew}>
        {resourceTypes.map(({ value, label, disabled }) => <option value={value} disabled={disabled}>{label}</option>)}
      </Select>
      <Divider />
      <div className={styles.formDateContainer}>
        <Input placeholder='Name' />
        <div className={styles.isActiveSwitchContainer}>
          <div className={styles.text}>Set resource active?</div>
          <Switch isDisabled={!isNew} />
        </div>
        <div className={styles.pollIntevalContainer}>
          <div className={styles.text}>How often should we poll the resource?</div>
          <Select value={pollInterval} onChange={(ev) => console.log(ev.target.value)}>
            {pollIntervals.map(({ value, label }) => <option value={value}>{label}</option>)}
          </Select>
        </div>
        <div className={styles.resourceByTypeContainer}>
          {renderResourceDetailsComponent()}
        </div>
      </div>
    </div>
  );
}
