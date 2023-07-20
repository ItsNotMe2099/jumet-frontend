import {
  Entity,
} from 'typeorm'
import { CrudValidationGroups } from '@nestjsx/crud'

const { CREATE, UPDATE } = CrudValidationGroups

export enum AreaGeoObjectType {
  Polygon = 'polygon',
  Circle = 'circle',
}

@Entity({
  name: 'delivery-areas',
})
export class IDeliveryArea {
  id: number
  receivingPointId: number
  name?: string
  type: AreaGeoObjectType
  coordinates: number[][]
  center: { type: string; coordinates: number[] }
  radius: number
  fromDistance: number
  toDistance: number
  deliveryPricePerTon: number
  createdAt: Date
}
