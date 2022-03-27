import { DeliveryStatus, IDelivery } from '@Interfaces/delivery';
import axios from 'axios';

const API = process.env.REACT_APP_API;

export const deliveriesApi = axios.create({
  baseURL: API,
  timeout: 3000
});

const updateDelivery = async (data: IDelivery) => {
  try {
    const result = await deliveriesApi.put(`/deliveries/${data.id}`, data);

    return result;
  // eslint-disable-next-line
  } catch (e: any) {
    throw Error(e);
  }
};

export const updateDeliveryStatus = async (status: string, data: IDelivery) => {
  const tempData = {
    ...data,
    active: DeliveryStatus.delivered === status,
    delivery: {
      ...data.delivery,
      status
    }
  } as IDelivery;

  return await updateDelivery(tempData);
};

export const updateActiveDelivery = async (data: IDelivery) => {
  const tempData = {
    ...data,
    active: true,
    delivery: {
      ...data.delivery,
      status: DeliveryStatus.undelivered
    }
  };

  return await updateDelivery(tempData);
};

export default (url: string) => axios.get(url).then(res => res.data);