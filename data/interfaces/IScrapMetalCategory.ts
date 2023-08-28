import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'

export interface IScrapMetalCategory {
  id: number
  category: ScrapMetalCategory
  name: string
  description: string
  synonymIds: number[]
}
