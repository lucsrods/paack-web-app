import React from 'react';
import useSWR from 'swr';

import fetcher from '@Utils/fetcher';

const API = process.env.REACT_APP_API;

const useDeliveries = (id = '') => {
  const { data, error } = useSWR(`${API}/deliveries/${id}`, fetcher);

  return {
    data,
    loading: !data && !error,
    error
  };
};

export default useDeliveries;