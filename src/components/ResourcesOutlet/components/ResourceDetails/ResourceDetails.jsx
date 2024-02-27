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

export default function ResourceDetails(props) {
  const { isNew, id } = useOutletContext();
  const [resourceType, setResourceType] = useState(resourceTypes[0].value);

  function renderResourceDetailsComponent() {
    if (resourceType === resourceTypeValues.mySql) return <MySqlResourceDetails isNew={isNew}/>;
  }

  return (
    <div className={styles.container}>
      <Select value={resourceType} onChange={(ev) => console.log(ev.target.value)} isDisabled={!isNew}>
        {resourceTypes.map(({ value, label, disabled }) => <option value={value} disabled={disabled}>{label}</option>)}
      </Select>
      <Divider />
      <div className={styles.formDateContainer}>
        <div className={styles.resourceByTypeContainer}>
          {renderResourceDetailsComponent()}
        </div>
      </div>
    </div>
  );
}
