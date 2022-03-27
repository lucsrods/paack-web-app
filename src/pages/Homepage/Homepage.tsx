import Loading from '@Components/Loading';
import Status from '@Components/Status';
import { DeliveryContext } from '@Contexts/DeliveryContext';
import { IDelivery } from '@Interfaces/delivery';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  Item,
  List,
} from './styles';

const Homepage = () => {
  const { deliveries, loading } = useContext(DeliveryContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <List>
      {deliveries?.map((delivery: IDelivery) => (
        <Item key={delivery.id} active={delivery.active}>
          <Link to={`/delivery/${delivery.id}`}>{delivery.client}</Link>
          <Status status={delivery.delivery.status} isActive={delivery.active} />
        </Item>
      ))}
    </List>
  );
};

export default Homepage;