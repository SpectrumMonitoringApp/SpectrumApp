import React from 'react';
import { Input, Button } from '@chakra-ui/react';

import styles from './my-sql-resource-details.module.scss';

export default function MySqlResourceDetails(props) {
  return (
    <div className={styles.container}>
      <Input placeholder='Host' />
      <Input placeholder='Username' />
      <Input placeholder='Password' />
      <Input placeholder='Database' />
      <Button colorScheme='teal'>Create</Button>
    </div>
  );
}
