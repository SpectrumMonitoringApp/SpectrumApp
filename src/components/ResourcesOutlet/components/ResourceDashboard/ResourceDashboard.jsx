import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  useToast
} from '@chakra-ui/react';

import { getResourceDataStores } from './services/getResourceDataStores';
import { workspaceIdLocalStorageKey } from '../../../../services/workspace';

import styles from './resource-dashboard.module.scss';
import { createNewDataStore } from './services/createNewDataStore';

export default function ResourceDashboard(props) {
  const { id } = useOutletContext();
  const workspaceId = localStorage.getItem(workspaceIdLocalStorageKey);
  const toast = useToast();
  const [isDataStoresLoading, setIsDataStoresLoading] = useState(false);
  const [isAddDataStoreLoading, setIsAddDataStoreLoading] = useState(false);
  const [dataStores, setDataStores] = useState([{ id: 1, name: 'User' }, { id: 2, name: 'Resource' }, {
    id: 3,
    name: 'Workspace'
  }]);
  const [newDataStoreName, setNewDataStoreName] = useState('');

  useEffect(() => {
    proceedResourceDataStores();
  }, []);

  /**
   * Fetch all data stores corresponding to the resource
   * @returns {Promise<void>}
   */
  async function proceedResourceDataStores() {
    setIsDataStoresLoading(true);

    const [err, res] = await to(getResourceDataStores(workspaceId, id));

    setIsDataStoresLoading(false);

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    const fetchedDataStores = res.map(({ id, name }) => ({ id, name }));

    setDataStores(fetchedDataStores);
  }

  /**
   * Handle adding new data store
   * @returns {Promise<void>}
   */
  async function handleDataStoreAdd() {
    if (!newDataStoreName) return;

    setIsAddDataStoreLoading(true);

    const [err] = await to(createNewDataStore(workspaceId, id, newDataStoreName));

    setIsAddDataStoreLoading(false);

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });


    setNewDataStoreName('');
    toast({
      title: `Data Store ${newDataStoreName} has been updated`,
      status: 'success',
      isClosable: true
    });
    proceedResourceDataStores();
  }

  /**
   * Handle data store delete
   * @param idToDelete
   * @returns {Promise<void>}
   */
  async function handleDataSourceDelete(idToDelete) {
    const filteredDataStores = dataStores.filter(({ id }) => id !== idToDelete);

    setDataStores(filteredDataStores);
  }

  return (
    <div className={styles.container}>
      <div>Resource: {id}</div>
      <Link to={`/resources/${id}/edit`}><Button colorScheme='teal'>Edit Resource</Button></Link>
      <div className={styles.dataStoresContainer}>
        <div className={styles.existingDataStores}>
          <div className={styles.title}>
            Data Stores
          </div>
          <div className={styles.dataStoresList}>
            {dataStores.map(({ id, name }) => (
              <Tag
                key={id}
                borderRadius='full'
                variant='solid'
                colorScheme='green'
              >
                <TagLabel>{name}</TagLabel>
                <TagCloseButton onClick={() => handleDataSourceDelete(id)} />
              </Tag>
            ))}
          </div>
        </div>
        <div className={styles.addNewDataStoreContainer}>
          <Input placeholder='Enter data store name' value={newDataStoreName}
                 onChange={(e) => setNewDataStoreName(e.target.value)} />
          <Button colorScheme='teal' variant='outline' isLoading={isAddDataStoreLoading} isDisabled={!newDataStoreName} onClick={handleDataStoreAdd}>Add Data Store</Button>
        </div>
      </div>
    </div>
  );
}
