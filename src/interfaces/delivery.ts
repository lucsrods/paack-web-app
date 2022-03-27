export enum DeliveryStatus {
  delivered = 'delivered',
  undelivered = 'undelivered',
}

export interface IDelivery {
  client: string,
  customer: {
    name: string,
    address: string,
    city: string,
    zipCode: number | string,
    latitude: number | string,
    longitude: number | string
  },
  delivery: {
    status?: DeliveryStatus | undefined,
    latitude: number | string | null,
    longitude: number | string | null
  },
  id: string,
  active: boolean
}