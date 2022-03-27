import useDeliveries from '@Hooks/useDeliveries';
import { DeliveryStatus, IDelivery } from '@Interfaces/delivery';
import React, { createContext, useReducer, useState, useEffect } from 'react';
import useDeepCompareEffect from 'use-deep-compare-effect';

type Action = {
  type: string,
  payload: {
    id?: string
    status?: DeliveryStatus | undefined,
    deliveries?: Array<IDelivery>
  }
}

type DeliveryContextType = {
  loading: boolean;
  // eslint-disable-next-line
  error: any;
  deliveries: Array<IDelivery> | undefined;
  activeDelivery: IDelivery | undefined;
  dispatch: ({ payload, type }: Action) => void | null
}

const initialContext = {
  loading: true,
  error: null,
  deliveries: [],
  activeDelivery: undefined,
  // eslint-disable-next-line
  dispatch: ({ payload, type }: Action) => null, 
};

export const DeliveryContext = createContext<DeliveryContextType>(initialContext);

function reducer(state: Array<IDelivery> | undefined, action: Action) {
  switch(action.type) {
  case 'init':
    return action.payload.deliveries;
  case 'active': {
    if (!state?.length) return;

    const deliveryIndex = state
      .findIndex(({ id }: { id: string }) => id === action.payload.id);

    const tempData = {...state?.[deliveryIndex]};
    tempData.active = true;
    tempData.delivery.status = DeliveryStatus.undelivered;

    state[deliveryIndex] = tempData;

    return [...state];
  }
  case 'updateStatus': {
    if (!state?.length) return;

    const deliveryIndex = state
      .findIndex(({ id }: { id: string }) => id === action.payload.id);

    const tempData = {...state[deliveryIndex]};
    tempData.active = false;
    tempData.delivery.status = action.payload.status;

    state[deliveryIndex] = tempData;

    return [...state];
  }
  default:
    throw new Error();
  }
}

function DeliveryContextProvider({ children }: { children: React.ReactNode }) {
  const { data, error } = useDeliveries();
  const [activeDelivery, setActiveDelivery] = useState<IDelivery | undefined>(undefined);
  const [deliveries, dispatch] = useReducer(reducer, data);

  useDeepCompareEffect(() => {
    if (!data) return;

    dispatch({ type: 'init', payload: { deliveries: data } });

  }, [data || {}]);

  useEffect(() => {
    if (!deliveries) return;

    setActiveDelivery(deliveries.find(({ active }: { active: boolean }) => active));
  }, [deliveries || {}]);

  return (
    <DeliveryContext.Provider value={{
      loading: !deliveries,
      error,
      deliveries,
      activeDelivery,
      dispatch
    }}>
      {children}
    </DeliveryContext.Provider>
  );
}

export default DeliveryContextProvider;