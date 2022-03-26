import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import useDeliveries from '@Pages/Homepage/hooks/useDeliveries';
import { DeliveryContext } from '@Contexts/DeliveryContext';

const DetailsPage = () => {
  const { activeDelivery } = useContext(DeliveryContext);
  const { id } = useParams();
  const { data, loading } = useDeliveries(id);

  if (loading) {
    return <h2>Loading Delivery</h2>;
  }

  const isActiveDelivery = activeDelivery.id === id;

  const {
    client,
    customer
  } = data;

  return (
    <div>
      <Link to="/">Deliveries list</Link>

      <h1>Delivery Details</h1>
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

      {isActiveDelivery && (
        <div>
          <button type="button">Delivered</button>
          <button type="button">Undelivered</button>
        </div> 
      )}

      {!isActiveDelivery && (
        <div>
          <button type="button" disabled={Boolean(activeDelivery)}>Make Active</button>
          <Link to={`/delivery/${activeDelivery.id}`}>Go to Active Delivery</Link>
        </div>
      )}

    </div>
  );
};

export default DetailsPage;