import {IPriceDescription} from '@/data/interfaces/IPriceDescription'

export interface IPriceDescriptionByWeight {
  id: number
  priceDescription: IPriceDescription
  priceDescriptionId: number
  minWeightInTons: number
  maxWeightInTons: number
  rubbishInPercents: number
  price: number
  ownerId?: number
  createdAt: Date
}
