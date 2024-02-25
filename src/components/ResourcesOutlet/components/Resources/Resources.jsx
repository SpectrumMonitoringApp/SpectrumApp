import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardHeader, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import ResourceCard from './ResourceCard/ResourceCard';

import styles from './recources.module.scss';

const resourcesMock = [{ id: 1, name: 'Workaround', type: 'MySQL', pollInterval: '15m' }, { id: 2, name: 'Workaround', type: 'MySQL', pollInterval: '15m' }];

export default function Resources(props) {
  return (
    <div className={styles.container}>
      <Link to='/resources/new'><Button colorScheme='teal'>Create</Button></Link>
      <div className={styles.resourcesList}>
        {resourcesMock.map(({ id, name, type, pollInterval }) => <ResourceCard id={id} name={name} type={type}
                                                                           pollInterval={pollInterval} />)}

      </div>
    </div>
  );
}
