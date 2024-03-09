import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import { useOutletContext } from 'react-router-dom';
import { Select, Divider, useToast } from '@chakra-ui/react';

import MySqlResourceDetails from './components/MySqlResourceDetails/MySqlResourceDetails';
import { getResource } from './services/getResource';
import { workspaceIdLocalStorageKey } from '../../../../services/workspace';

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
  const { isNew, id: resourceId } = useOutletContext();
  const workspaceId = localStorage.getItem(workspaceIdLocalStorageKey);
  const toast = useToast();
  const [resourceType, setResourceType] = useState(resourceTypes[0].value);
  const [resourceDetails, setResourceDetails] = useState({});

  useEffect(() => {
    processResource();
  }, []);

  /**
   * Get resource details
   * @returns {Promise<string|number>}
   */
  async function processResource() {
    const [err, res] = await to(getResource(workspaceId, resourceId));

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    const { resource, resourceCredentials } = res;

    setResourceType(resource.type)
    setResourceDetails({ ...resource, ...resourceCredentials });
  }

  function renderResourceDetailsComponent() {
    if (resourceType === resourceTypeValues.mySql) return <MySqlResourceDetails resourceId={resourceId} isNew={isNew} workspaceId={workspaceId} resourceDetails={resourceDetails}/>;
  }

  return (
    <div className={styles.container}>
      <Select value={resourceType} onChange={(ev) => console.log(ev.target.value)} isDisabled={!isNew}>
        {resourceTypes.map(({ value, label, disabled }) => <option key={value} value={value}
                                                                   disabled={disabled}>{label}</option>)}
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
