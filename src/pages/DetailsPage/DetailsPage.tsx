import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import Button from '@Components/Button';
import Status from '@Components/Status';
import Loading from '@Components/Loading';
import { DeliveryContext } from '@Contexts/DeliveryContext';
import { DeliveryStatus, IDelivery } from '@Interfaces/delivery';
import { updateActiveDelivery, updateDeliveryStatus } from '@Services/deliveries';

import { ActionsWrapper, DetailsPageWrapper } from './styles';

const DetailsPage = () => {
  const { activeDelivery, deliveries, dispatch } = useContext(DeliveryContext);
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [currentDelivery, setDelivery] = useState<IDelivery | undefined>(undefined);

  useEffect(() => {
    setLoading(true);
    setDelivery(deliveries?.find(({ id: deliveryId }) => deliveryId === id));
    setLoading(false);
  }, [deliveries, id]);

  if (loading || !currentDelivery) {
    return <Loading />;
  }

  const isActiveDelivery = activeDelivery?.id === id;

  const {
    client,
    customer,
    delivery
  } = currentDelivery;

  const handleDeliveryStatus = async (deliveryStatus: DeliveryStatus) => {
    setLoading(true);
    const { status } = await updateDeliveryStatus(deliveryStatus, currentDelivery);

    if (status === 200) {
      dispatch({ type: 'updateStatus', payload: { id: currentDelivery.id, status: deliveryStatus } });
      setLoading(false);
    }
  };

  const handleActiveDelivery = async () => {
    setLoading(true);
    const { status } = await updateActiveDelivery(currentDelivery); 

    if (status === 200) {
      dispatch({ type: 'active', payload: { id: currentDelivery.id } });
      setLoading(false);
    }
  };

  return (
    <DetailsPageWrapper>
      <Link to="/">Deliveries list</Link>

      <h1>Delivery Details</h1>
      <span><b>STATUS: </b><Status isActive={isActiveDelivery} status={delivery.status} /></span>

      <h2>Client: </h2>
      <p>{client}</p>

      <h2>Customer Information:</h2>
      <p><b>Name: </b>{customer.name}</p>
      <p><b>Address: </b>{customer.address}, {customer.city} – <b>Zip Code: </b>{customer.zipCode}</p>
      {customer?.latitude && customer?.longitude && (
        <>
          <p><b>Latitude: </b>{customer.latitude}</p>
          <p><b>Longitude: </b>{customer.longitude}</p> 
        </>
      )}

      <ActionsWrapper>
        {isActiveDelivery && (
          <>
            <Button
              onClick={() => handleDeliveryStatus(DeliveryStatus.delivered)}
              disabled={loading}
            >
            Delivered
            </Button>
            <Button
              onClick={() => handleDeliveryStatus(DeliveryStatus.undelivered)}
              disabled={loading}
            >
            Undelivered
            </Button>
          </> 
        )}

        {!isActiveDelivery && (
          <>
            {delivery.status !== DeliveryStatus.delivered && (
              <Button
                disabled={Boolean(activeDelivery)}
                onClick={handleActiveDelivery}>
                Make Active
              </Button>
            )}
            {activeDelivery?.id && (
              <Link to={`/delivery/${activeDelivery?.id}`}>
                Go to Active Delivery
              </Link>)
            }
          </>
        )}
      </ActionsWrapper>
    </DetailsPageWrapper>
  );
};

export default DetailsPage;