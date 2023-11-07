import {ILocation} from '@/data/interfaces/ILocation'

export interface IAddress {
  address?: string | null
  city?: string | null
  region?: string | null
  street?: string | null
  house?: string | null
  entrance?: string | null
  floor?: string | null
  location?: ILocation | null
}
