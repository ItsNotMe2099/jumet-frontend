import {ILocation} from '@/data/interfaces/ILocation'

export class IAddress {
  address: string
  city: string
  street: string
  house: string
  entrance: string
  floor: string
  apartment: string
  intercomCode: string
  comment: string
  location: ILocation
}
