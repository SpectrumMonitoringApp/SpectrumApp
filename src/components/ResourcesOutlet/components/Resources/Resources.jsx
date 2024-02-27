import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import { Link } from 'react-router-dom';
import { Button, useToast } from '@chakra-ui/react';

import ResourceCard from './ResourceCard/ResourceCard';

import { getWorkspaceResources } from './services/getWorkspaceResources';
import { getSelectedWorkspace } from '../../../../services/workspace';

import styles from './recources.module.scss';


const resourcesMock = [{ id: 1, name: 'Workaround', type: 'MySQL', pollInterval: '15m' }, {
  id: 2,
  name: 'Workaround',
  type: 'MySQL',
  pollInterval: '15m'
}];

export default function Resources(props) {
  const toast = useToast();
  const [workspaceResources, setWorkspaceResource] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Proceed workspace resource on page mount
   */
  useEffect(() => {
    proceedWorkspaceResources();
  }, [])

  /**
   * Fetch workspace resources usr has access to
   */
  async function proceedWorkspaceResources() {
    const currentWorkspaceId = getSelectedWorkspace();

    if (!currentWorkspaceId) return;

    const [err, res] = await to(getWorkspaceResources(currentWorkspaceId));

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    setWorkspaceResource(res);
  }

  return (
    <div className={styles.container}>
      <Link to='/resources/new'><Button colorScheme='teal'>Create</Button></Link>
      <div className={styles.resourcesList}>
        {workspaceResources.map(({ id, name, type, pollInterval }) => <ResourceCard id={id} name={name} type={type}
                                                                               pollInterval={pollInterval} />)}

      </div>
    </div>
  );
}
