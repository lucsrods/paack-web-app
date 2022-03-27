import useSWR from 'swr';

import deliveriesFetcher from '../services/deliveries';

const API = process.env.REACT_APP_API;

const useDeliveries = () => {
  const { data, error } = useSWR(`${API}/deliveries`, deliveriesFetcher);

  return {
    data,
    loading: !data && !error,
    error,
  };
};

export default useDeliveries;