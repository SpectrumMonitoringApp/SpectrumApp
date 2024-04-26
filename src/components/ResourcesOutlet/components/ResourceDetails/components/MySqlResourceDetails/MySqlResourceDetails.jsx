import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import { Input, Button, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import GenericResourceDetails from '../GenericResourceDetails/GenericResourceDetails';
import { getSelectedWorkspace } from '../../../../../../services/workspace';
import { pollIntervalValues } from '../../../../services/constants';
import { createMySqlResource } from './services/createMySqlResource';
import { updateResource } from '../../services/updateResource';

import styles from './my-sql-resource-details.module.scss';

export default function MySqlResourceDetails(props) {
  const toast = useToast();
  const navigate = useNavigate();
  const { isNew, resourceDetails, resourceId, workspaceId } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [isPollIntervalLoading, setIsPollIntervalLoading] = useState(false);
  const [pollInterval, setPollInterval] = useState(pollIntervalValues['10m']);
  const [resourceName, setResourceName] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('');

  useEffect(() => {
    if (isNew || !resourceDetails) return;

    const {
      name,
      isActive: isResourceActive,
      pollInterval,
      host,
      port,
      username,
      password,
      databaseName
    } = resourceDetails;

    setResourceName(name);
    setIsActive(isResourceActive);
    setPollInterval(pollInterval);
    setHost(host);
    setPort(port);
    setUsername(username);
    setPassword(password);
    setDatabase(databaseName);
  }, [resourceDetails]);


  /**
   * Handle create/update for MySQL resource
   */
  async function handleSubmitButtonClick() {
    const currentWorkspaceId = getSelectedWorkspace();

    if (!currentWorkspaceId) return;

    // Update fill be implemented soon
    if (!isNew) {
      const updateResourceData = {
        name: resourceName
      };
      const updateResourceCredentialsData = {
        host,
        port,
        username,
        password,
        databaseName: database
      };

      setIsLoading(true);

      const [err] = await to(updateResource(workspaceId, resourceId, updateResourceData, updateResourceCredentialsData));

      setIsLoading(false);

      if (err) return toast({
        title: 'Whoops, there was an error.',
        status: 'error',
        isClosable: true
      });

      toast({
        title: 'MySQL resource has been updated',
        status: 'success',
        isClosable: true
      });
      navigate(`/resources/${resourceId}`);

      return;
    }

    const resourceInfo = {
      workspaceId: currentWorkspaceId,
      name: resourceName,
      type: 'mySql',
      isActive,
      pollInterval,
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

  /**
   * Handle isActive switch click
   */
  async function handleIsActiveResourceChange(isChecked) {
    setIsActive(isChecked);

    if (isNew) return;

    setIsSwitchLoading(true);

    const [err] = await to(updateResource(workspaceId, resourceId, { isActive: isChecked }, {}));

    setIsSwitchLoading(false);

    if (err) {
      setIsActive(!isChecked);

      return toast({
        title: 'Whoops, there was an error.',
        status: 'error',
        isClosable: true
      });
    }

    toast({
      title: `Resource ${isChecked ? 'activated' : 'deactivated'}`,
      status: 'success',
      isClosable: true
    });
  }

  /**
   * Handle isActive switch click
   */
  async function handlePollIntervalChange(pollIntervalValue) {
    const currentPollIntervalValue = pollInterval;

    setPollInterval(pollIntervalValue);

    if (isNew) return;

    setIsPollIntervalLoading(true);

    const [err] = await to(updateResource(workspaceId, resourceId, { pollInterval: pollIntervalValue }, {}));

    setIsPollIntervalLoading(false);

    if (err) {
      setPollInterval(currentPollIntervalValue);

      return toast({
        title: 'Whoops, there was an error.',
        status: 'error',
        isClosable: true
      });
    }

    toast({
      title: `Resource poll interval updated`,
      status: 'success',
      isClosable: true
    });
  }

  return (
    <div className={styles.container}>
      <GenericResourceDetails pollInterval={pollInterval}
                              onPollIntervalChange={(e) => handlePollIntervalChange(e.target.value)}
                              resourceName={resourceName}
                              onResourceNameChange={(e) => setResourceName(e.target.value)}
                              onIsActiveChange={(e) => handleIsActiveResourceChange(e.target.checked)}
                              isActive={isActive}
                              isSwitchLoading={isSwitchLoading}
                              isPollIntervalLoading={isPollIntervalLoading} />
      <Input placeholder='Host' value={host} onChange={(e) => setHost(e.target.value)} />
      <Input placeholder='Port' value={port} onChange={(e) => setPort(e.target.value)} />
      <Input placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input placeholder='Database' value={database} onChange={(e) => setDatabase(e.target.value)} />
      <Button colorScheme='teal' onClick={handleSubmitButtonClick} isLoading={isLoading}>Create</Button>
    </div>
  );
}
