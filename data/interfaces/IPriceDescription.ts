import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import {IPriceDescriptionByWeight} from '@/data/interfaces/IPriceDescriptionByWeight'

export interface IPriceDescription {
  id: number
  receivingPointId: number
  category: ScrapMetalCategory
  priceDependsOnWeight: boolean
  priceDependsOnRubbish: boolean
  price?: number
  pricesByWeight?: IPriceDescriptionByWeight[]
  rubbishInPercents?: number
  ownerId?: number
  createdAt: Date
}
