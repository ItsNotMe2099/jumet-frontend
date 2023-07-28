
export enum AreaGeoObjectType {
  Polygon = 'polygon',
  Circle = 'circle',
}


export interface IDeliveryArea {
  id?: number
  name?: string | null
  fromDistance: number | null
  toDistance: number | null
  deliveryPricePerTon: number | null
}
