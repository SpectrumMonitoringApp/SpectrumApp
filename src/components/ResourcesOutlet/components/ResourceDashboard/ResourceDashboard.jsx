import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import styles from './resource-dashboard.module.scss';

export default function ResourceDashboard(props) {
  const { id } = useOutletContext();

  return (
    <div>
      <div>Resource: {id}</div>
      <Link to={`/resources/${id}/edit`}><Button colorScheme='teal'>Edit</Button></Link>
    </div>
  );
}
