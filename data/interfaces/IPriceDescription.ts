import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import {IPriceDescriptionByWeight} from '@/data/interfaces/IPriceDescriptionByWeight'

export class IPriceDescription {
  id: number
  receivingPointId: number
  category: ScrapMetalCategory
  priceDependsOnWeight: boolean
  priceDependsOnRubbish: boolean
  price: number
  pricesByWeight: IPriceDescriptionByWeight[]
  ownerId?: number
  createdAt: Date
}
