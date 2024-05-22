import {Nullable} from '@/types/types'
import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'

export interface IDealCalculateRequest{
  actualWeight: Nullable<number>,
  actualRubbishInPercents: Nullable<number>,
  price: Nullable<number>,
  deliveryPrice: Nullable<number>,
  loadingPrice: Nullable<number>
  scrapMetalCategory: Nullable<ScrapMetalCategory>
}
