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
  id: number = 0
  receivingPointId: number = 0
  name?: string = ''
  type: AreaGeoObjectType = AreaGeoObjectType.Polygon
  coordinates: number[][] = []
  center: { type: string; coordinates: number[] } = {type: '', coordinates: []}
  radius: number = 0
  fromDistance: number = 0
  toDistance: number = 0
  deliveryPricePerTon: number = 0
  createdAt: Date = new Date()
}
