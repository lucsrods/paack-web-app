import useDeliveries from '@Pages/Homepage/hooks/useDeliveries';
import React, { createContext, useState } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

type DeliveryContextType = {
  loading: boolean;
  error: any;
  data: any;
  activeDelivery: any;
}

const initialState = {
  loading: true,
  error: null,
  data: null,
  activeDelivery: null
};

export const DeliveryContext = createContext<DeliveryContextType>(initialState);

function DeliveryContextProvider({ children }: { children: React.ReactNode }) {
  const { data, error } = useDeliveries();
  const [activeDelivery, setActiveDelivery] = useState(null);

  useDeepCompareEffect(() => {
    if (!data) return;

    setActiveDelivery(data.find(({ active }: { active: boolean }) => active));

  }, [data || {}]);

  return (
    <DeliveryContext.Provider value={{ loading: !data, error, data, activeDelivery }}>
      {children}
    </DeliveryContext.Provider>
  );
}

export default DeliveryContextProvider;