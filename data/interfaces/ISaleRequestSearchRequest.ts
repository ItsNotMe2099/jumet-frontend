import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import {ILocation} from '@/data/interfaces/ILocation'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface ISaleRequestSearchRequest extends IPaginationRequest {
  location?: ILocation;
  radius?: number;
  scrapMetalCategory?: ScrapMetalCategory;
  weightMin: number,
  weightMax:number
  priceMin: number
  priceMax: number
  requiresDelivery: true,
  requiresLoading: true
}
