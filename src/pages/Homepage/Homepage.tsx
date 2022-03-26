import React from 'react';
import { Link } from 'react-router-dom';

import useDriverActivity from './hooks/useDriverActivity';

import {
  Item,
  List
} from './styles';

const Homepage = () => {
  const { data, loading } = useDriverActivity();

  if (loading) {
    return <h2>Loading</h2>;
  }

  return (
    <List>{data.map((delivery: any) => (<Item key={delivery.id}><Link to={`/delivery/${delivery.id}`}>{delivery.client}</Link></Item>))}</List>
  );
};

export default Homepage;