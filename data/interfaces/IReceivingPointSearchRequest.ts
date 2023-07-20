import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import {ILocation} from '@/data/interfaces/ILocation'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IReceivingPointSearchRequest extends IPaginationRequest {
  location?: ILocation | null;
  radius?: number | null;
  scrapMetalCategory?: ScrapMetalCategory | null;
  weight?: number | null;
  hasDelivery?: boolean | null;
  hasLoading?: boolean | null;
}
