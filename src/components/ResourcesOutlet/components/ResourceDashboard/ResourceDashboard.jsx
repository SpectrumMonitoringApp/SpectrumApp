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
  useToast
} from '@chakra-ui/react';

import { getResourceDataStores } from './services/getResourceDataStores';
import { workspaceIdLocalStorageKey } from '../../../../services/workspace';

import styles from './resource-dashboard.module.scss';
import { createNewDataStore } from './services/createNewDataStore';
import { deleteDataStore } from './services/deleteDataStore';

const data = [
    [1640736000000, 9904],
    [1640736005000, 14748],
    [1640736010000, 19933],
    [1640736015000, 26318],
    [1640736020000, 30841],
    [1640736025000, 36952],
    [1640736030000, 43871],
    [1640736035000, 48839],
    [1640736040000, 53749],
    [1640736045000, 61696],
    [1640736050000, 66086],
    [1640736055000, 72546],
    [1640736060000, 82433],
    [1640736065000, 87175],
    [1640736070000, 92122],
    [1640736075000, 100851],
    [1640736080000, 108028],
    [1640736085000, 113900],
    [1640736090000, 116514],
    [1640736095000, 125335],
    [1640736100000, 134266],
    [1640736105000, 142329],
    [1640736110000, 146204],
    [1640736115000, 152166],
    [1640736120000, 155186],
    [1640736125000, 155956],
    [1640736130000, 163160],
    [1640736135000, 171496],
    [1640736140000, 181817],
    [1640736145000, 186690],
    [1640736150000, 196090],
    [1640736155000, 201661],
    [1640736160000, 211239],
    [1640736165000, 218555],
    [1640736170000, 222897],
    [1640736175000, 225288],
    [1640736180000, 228805],
    [1640736185000, 234257],
    [1640736190000, 242757],
    [1640736195000, 249570],
    [1640736200000, 258476],
    [1640736205000, 260888],
    [1640736210000, 268287],
    [1640736215000, 281697],
    [1640736220000, 286903],
    [1640736225000, 292100],
    [1640736230000, 301011],
    [1640736235000, 301818],
    [1640736240000, 305159],
    [1640736245000, 313267],
    [1640736250000, 324298],
    [1640736255000, 328346],
    [1640736260000, 337165],
    [1640736265000, 344098],
    [1640736270000, 351888],
    [1640736275000, 356103],
    [1640736280000, 356043],
    [1640736285000, 359351],
    [1640736290000, 367109],
    [1640736295000, 374137],
    [1640736300000, 377117],
    [1640736305000, 384919],
    [1640736310000, 390155],
    [1640736315000, 398856],
    [1640736320000, 402734],
    [1640736325000, 413775],
    [1640736330000, 421979],
    [1640736335000, 426746],
    [1640736340000, 433293],
    [1640736345000, 439726],
    [1640736350000, 449330],
    [1640736355000, 454868],
    [1640736360000, 457035],
    [1640736365000, 462334],
    [1640736370000, 466582],
    [1640736375000, 472067],
    [1640736380000, 478380]
];

export default function ResourceDashboard(props) {
  const { id } = useOutletContext();
  const workspaceId = localStorage.getItem(workspaceIdLocalStorageKey);
  const toast = useToast();
  const [isDataStoresLoading, setIsDataStoresLoading] = useState(true);
  const [isAddDataStoreLoading, setIsAddDataStoreLoading] = useState(false);
  const [isDeleteDataStoreLoading, setIsDeleteDataStoreLoading] = useState(false);
  const [dataStores, setDataStores] = useState([]);
  const [newDataStoreName, setNewDataStoreName] = useState('');
  const [chartData, setChartData] = useState([]);
  const options = {
    chart: {
      zoomType: 'x'
    },
    title: {
      text: 'Records number over time',
      align: 'left'
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
        'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
      align: 'left'
    },
    xAxis: {
      type: 'datetime'
    },
    yAxis: {
      title: {
        text: 'Records number'
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },

    series: [{
      type: 'area',
      name: 'Records number',
      data: chartData
    }]
  };

  useEffect(() => {
    setTimeout(() => setChartData(data), 1000);
  }, []);

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

  return (
    <div className={styles.container}>
      <div>Resource: {id}</div>
      <Link to={`/resources/${id}/edit`}><Button colorScheme='teal'>Edit Resource</Button></Link>
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
          <Button colorScheme='teal' variant='outline' isLoading={isAddDataStoreLoading} isDisabled={!newDataStoreName}
                  onClick={handleDataStoreAdd}>Add Data Store</Button>
        </div>
      </div>
      <div className={styles.chartContainer}>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps = {{ className: styles.testChart }}
        />
      </div>
    </div>
  );
}
