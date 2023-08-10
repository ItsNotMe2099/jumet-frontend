import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import {ILocation} from '@/data/interfaces/ILocation'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {SortOrder} from '@/types/enums'

export interface ISaleRequestSearchRequest extends IPaginationRequest {
  location?: ILocation | null
  radius?: number | null
  scrapMetalCategory?: ScrapMetalCategory | null
  weightMin?: number | null
  weightMax?:number | null
  priceMin?: number | null
  priceMax?: number | null
  requiresDelivery?: boolean
  requiresLoading?: boolean
  sortOrder?: SortOrder
}
