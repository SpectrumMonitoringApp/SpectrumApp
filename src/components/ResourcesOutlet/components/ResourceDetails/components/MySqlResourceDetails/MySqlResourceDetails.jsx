import React, { useState } from 'react';
import to from 'await-to-js';
import { Input, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import GenericResourceDetails from '../GenericResourceDetails/GenericResourceDetails';
import { getSelectedWorkspace } from '../../../../../../services/workspace';
import { pollIntervalValues } from '../../../../services/constants';

import styles from './my-sql-resource-details.module.scss';
import { createMySqlResource } from './services/createMySqlResource';

export default function MySqlResourceDetails(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const { isNew } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [pollInterval, setPollInterval] = useState(pollIntervalValues['1m']);
  const [resourceName, setResourceName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('');

  /**
   * Handle create/update for MySQL resource
   */
  async function handleSubmitButtonClick() {
    const currentWorkspaceId = getSelectedWorkspace();

    if (!currentWorkspaceId) return;

    // Update fill be implemented soon
    if (!isNew) return;

    const resourceInfo = {
      workspaceId: currentWorkspaceId,
      name: resourceName,
      type: 'MySQL',
      host,
      port,
      username,
      password,
      databaseName: database
    };

    setIsLoading(true);

    const [err, res] = await to(createMySqlResource(resourceInfo));

    setIsLoading(false);

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    toast({
      title: 'MySQL resource has been created',
      status: 'success',
      isClosable: true
    });

    navigate(`/resources/${res}`);
  }

  return (
    <div className={styles.container}>
      <GenericResourceDetails pollInterval={pollInterval}
                              onPollIntervalChange={(e) => setPollInterval(e.target.value)} resourceName={resourceName}
                              onResourceNameChange={(e) => setResourceName(e.target.value)}
                              onIsActiveChange={() => setIsActive(!isActive)} isActive={isActive} />
      <Input placeholder='Host' value={host} onChange={(e) => setHost(e.target.value)} />
      <Input placeholder='Port' value={port} onChange={(e) => setPort(e.target.value)} />
      <Input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input placeholder='Database' value={database} onChange={(e) => setDatabase(e.target.value)} />
      <Button colorScheme='teal' onClick={handleSubmitButtonClick} isDisabled={!isNew}
              isLoading={isLoading}>Create</Button>
    </div>
  );
}
