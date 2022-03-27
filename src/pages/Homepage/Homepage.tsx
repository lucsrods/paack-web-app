import Curtain from '@Components/Curtain';
import Status from '@Components/Status';
import { ROUTES } from '@Constants/routes';
import { DeliveryContext } from '@Contexts/DeliveryContext';
import { IDelivery } from '@Interfaces/delivery';
import { buildUrl } from '@Utils/path';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import {
  Item,
  List,
} from './styles';

const Homepage = () => {
  const { deliveries, loading, error } = useContext(DeliveryContext);

  if (error) {
    const { request } = error;
    const errorTitle = request.status > 0 ? request.status : 'Something wrong happened';
    const errorMessage = request.status > 0 ? request.statusText : 'Try again later!';

    return <Curtain title={errorTitle } message={errorMessage} />;
  }

  if (loading) {
    return <Curtain title="Loading..." />;
  }

  return (
    <List>
      {deliveries?.map((delivery: IDelivery) => (
        <Item key={delivery.id} active={delivery.active}>
          <Link to={buildUrl(ROUTES.DELIVERY_DETAILS, delivery?.id)}>{delivery.client}</Link>
          <Status status={delivery.delivery.status} isActive={delivery.active} />
        </Item>
      ))}
    </List>
  );
};

export default Homepage;