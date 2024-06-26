import React, { useEffect, useState } from 'react';
import to from 'await-to-js';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Link, useOutletContext } from 'react-router-dom';
import {
  Button,
  Tag,
  TagLabel,
  TagCloseButton,
  Input,
  Skeleton,
  useToast,
  Checkbox,
  Divider
} from '@chakra-ui/react';

import DashboardChart from './components/DashboardChart';
import { workspaceIdLocalStorageKey } from '../../../../services/workspace';
import { getResourceDataStores } from './services/getResourceDataStores';
import { createNewDataStore } from './services/createNewDataStore';
import { deleteDataStore } from './services/deleteDataStore';
import { processDataStoresRecordCountData } from './services/processDataStoresRecordCountData';
import { processDataStoresVolumeData } from './services/processDataStoresVolumeData';
import { processDataStoresIndexSize } from './services/processDataStoresIndexSize';
import { getResource } from '../ResourceDetails/services/getResource';

import styles from './resource-dashboard.module.scss';
import ResourceCard from '../Resources/ResourceCard/ResourceCard';

/**
 * Select random color for series in Highcharts chart
 * @returns {*}
 */
function pickRandomSeriesColor() {
  const availableHighchartsColors = Highcharts.getOptions().colors;

  return availableHighchartsColors[Math.floor(Math.random() * availableHighchartsColors.length)];
}

export default function ResourceDashboard(props) {
  const { id } = useOutletContext();
  const workspaceId = localStorage.getItem(workspaceIdLocalStorageKey);
  const toast = useToast();
  const [isDataStoresLoading, setIsDataStoresLoading] = useState(true);
  const [isAddDataStoreLoading, setIsAddDataStoreLoading] = useState(false);
  const [isDeleteDataStoreLoading, setIsDeleteDataStoreLoading] = useState(false);
  const [isResourceInformationLoading, setIsResourceInformationLoading] = useState(false);
  const [dataStores, setDataStores] = useState([]);
  const [dataStoresToDisplay, setDataStoresToDisplay] = useState([]);
  const [newDataStoreName, setNewDataStoreName] = useState('');
  const [initialRecordCountChartSeries, setInitialRecordCountChartSeries] = useState([]);
  const [initialVolumeChartSeries, setInitialVolumeChartSeries] = useState([]);
  const [initialIndexSizeChartSeries, setInitialIndexSizeChartSeries] = useState([]);
  const [recordCountChartSeries, setRecordCountChartSeries] = useState([]);
  const [volumeChartSeries, setVolumeChartSeries] = useState([]);
  const [indexSizeChartSeries, setIndexSizeChartSeries] = useState([]);
  const [resourceInformation, setResourceInformation] = useState({});

  useEffect(() => {
    proceedResourceDataStores();
    processResource();
  }, []);

  /**
   * Get resource details
   * @returns {Promise<string|number>}
   */
  async function processResource() {
    if (!id) return;

    setIsResourceInformationLoading(true);

    const [err, res] = await to(getResource(workspaceId, id));

    setIsResourceInformationLoading(false);

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    const { resource } = res;

    setResourceInformation(resource);
  }

  async function getDataStoresRecordCountData(dataStoresIds) {
    const [err, res] = await to(processDataStoresRecordCountData(workspaceId, id, dataStoresIds));

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    const series = [];

    for (const [key, value] of Object.entries(res)) {
      const seriesColor = pickRandomSeriesColor();

      series.push({
        id: +key,
        type: 'area',
        name: value.name,
        data: value.dataPoints,
        color: seriesColor,
        fillColor: {
          stops: [
            [0, seriesColor],
            [1, Highcharts.color(seriesColor).setOpacity(0).get('rgba')]
          ]
        }
      });
    }

    setInitialRecordCountChartSeries(series);
    setRecordCountChartSeries(series);
  }

  async function getDataStoresVolumeData(dataStoresIds) {
    const [err, res] = await to(processDataStoresVolumeData(workspaceId, id, dataStoresIds));

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    const series = [];

    for (const [key, value] of Object.entries(res)) {
      const seriesColor = pickRandomSeriesColor();

      series.push({
        id: +key,
        type: 'area',
        name: value.name,
        data: value.dataPoints,
        color: seriesColor,
        fillColor: {
          stops: [
            [0, seriesColor],
            [1, Highcharts.color(seriesColor).setOpacity(0).get('rgba')]
          ]
        }
      });
    }

    setInitialVolumeChartSeries(series);
    setVolumeChartSeries(series);
  }

  async function getDataStoresIndexSizeData(dataStoresIds) {
    const [err, res] = await to(processDataStoresIndexSize(workspaceId, id, dataStoresIds));

    if (err) return toast({
      title: 'Whoops, there was an error.',
      status: 'error',
      isClosable: true
    });

    const series = [];

    for (const [key, value] of Object.entries(res)) {
      const seriesColor = pickRandomSeriesColor();

      series.push({
        id: +key,
        type: 'area',
        name: value.name,
        data: value.dataPoints,
        color: seriesColor,
        fillColor: {
          stops: [
            [0, seriesColor],
            [1, Highcharts.color(seriesColor).setOpacity(0).get('rgba')]
          ]
        }
      });
    }

    setInitialIndexSizeChartSeries(series);
    setIndexSizeChartSeries(series);
  }

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

    const fetchedDataStores = res.map(({ id, name }) => ({ id, name, isActive: true }));
    const fetchedDataStoresIds = fetchedDataStores.map((ds) => ds.id);

    getDataStoresRecordCountData(fetchedDataStoresIds);
    getDataStoresVolumeData(fetchedDataStoresIds);
    getDataStoresIndexSizeData(fetchedDataStoresIds);

    setDataStores(fetchedDataStores);
    setDataStoresToDisplay(fetchedDataStores);
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
   * @param dataStoreToDeleteName
   * @returns {Promise<void>}
   */
  async function handleDataSourceDelete(idToDelete, dataStoreToDeleteName) {
    const currentDataStores = dataStores;
    const filteredDataStores = dataStores.filter(({ id }) => id !== idToDelete);

    setDataStores(filteredDataStores);
    setIsDeleteDataStoreLoading(true);

    const [err] = await to(deleteDataStore(workspaceId, id, idToDelete));

    setIsDeleteDataStoreLoading(false);

    if (err) {
      setDataStores(currentDataStores);

      return toast({
        title: 'Whoops, there was an error.',
        status: 'error',
        isClosable: true
      });
    }

    toast({
      title: `Data Store ${dataStoreToDeleteName} has been deleted`,
      status: 'success',
      isClosable: true
    });
  }

  function onDataStoreToDisplayClick(id, isChecked) {
    const updateDataStoresToDisplay = dataStoresToDisplay.map((dataStoresToDisplay) => {
      if (dataStoresToDisplay.id !== id) return dataStoresToDisplay;

      return { ...dataStoresToDisplay, isActive: isChecked };
    });

    setDataStoresToDisplay(updateDataStoresToDisplay);

    const updateDataStoresToDisplayIds = updateDataStoresToDisplay.filter((uds) => uds.isActive).map((uds) => uds.id);
    const updatedRecordCountChartSeries = initialRecordCountChartSeries.filter((chart) => updateDataStoresToDisplayIds.includes(chart.id));
    const updatedVolumeChartSeries = initialVolumeChartSeries.filter((chart) => updateDataStoresToDisplayIds.includes(chart.id));
    const updatedIndexSizeChartSeries = initialIndexSizeChartSeries.filter((chart) => updateDataStoresToDisplayIds.includes(chart.id));

    setRecordCountChartSeries(updatedRecordCountChartSeries);
    setVolumeChartSeries(updatedVolumeChartSeries);
    setIndexSizeChartSeries(updatedIndexSizeChartSeries);
  }

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeaderContainer}>
        <div className={styles.resourceTitleContainer}>Resource: {isResourceInformationLoading ?
          <Skeleton>Resource name</Skeleton> : <span
            className={styles.resourceName}>{resourceInformation?.name}</span>}</div>
        <Link to={`/resources/${id}/edit`}><Button colorScheme='teal'>Edit Resource</Button></Link>
      </div>

      <div className={styles.dataStoresContainer}>
        <div className={styles.existingDataStores}>
          <div className={styles.title}>
            Data Stores
          </div>
          <Skeleton isLoaded={!isDataStoresLoading}>
            <div className={styles.dataStoresList}>
              {dataStores.length ? dataStores.map(({ id, name }) => (
                <Tag
                  key={id}
                  borderRadius='full'
                  variant='solid'
                  colorScheme='teal'
                >
                  <TagLabel>{name}</TagLabel>
                  {<TagCloseButton onClick={() => handleDataSourceDelete(id, name)} />}
                </Tag>
              )) : <div className={styles.addFirstDataStoreHint}>Add your first data store below</div>}
            </div>
          </Skeleton>
        </div>
        <div className={styles.addNewDataStoreContainer}>
          <Input placeholder='Enter data store name' value={newDataStoreName}
                 onChange={(e) => setNewDataStoreName(e.target.value)} />
        </div>
        <div className={styles.addDataStoreButtonContainer}>
          <Button colorScheme='teal' variant='outline' isLoading={isAddDataStoreLoading} isDisabled={!newDataStoreName}
                  onClick={handleDataStoreAdd}>Add Data Store</Button>
        </div>
      </div>

      <Divider />

      <div className={styles.dataStoresToDisplayList}>
        {isDataStoresLoading ? [...Array(5).keys()].map((index) =>
          <Skeleton key={index}><Checkbox>
            <div className={styles.dataStoreName}>Skeleton</div>
          </Checkbox>)</Skeleton>) : dataStoresToDisplay.map((dataStore) => <Checkbox size='md' colorScheme='green'
                                                                                      isChecked={dataStore.isActive}
                                                                                      onChange={(e) => onDataStoreToDisplayClick(dataStore.id, e.target.checked)}>
          <div className={styles.dataStoreName}>{dataStore.name}</div>
        </Checkbox>)}
      </div>
      <div className={styles.chartsContainer}>
        <DashboardChart chartSeries={recordCountChartSeries} title='Records number over time'
                        yAxisTitle='Records number' />
        <DashboardChart chartSeries={volumeChartSeries} title='Volume over time' yAxisTitle='Megabytes' />
        <DashboardChart chartSeries={indexSizeChartSeries} title='Index size over time' yAxisTitle='Megabytes' />
      </div>
    </div>
  );
}
