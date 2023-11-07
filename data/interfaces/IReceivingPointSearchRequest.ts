import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'
import {ILocation} from '@/data/interfaces/ILocation'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {WorkTimeType} from '@/data/interfaces/WorkTimeType'
import {Nullable} from '@/types/types'

export interface IReceivingPointSearchRequest extends IPaginationRequest {
  location?:  Nullable<ILocation>;
  radius?:  Nullable<number>;
  scrapMetalCategories?: Nullable<ScrapMetalCategory[]>;
  weight?:  Nullable<number>;
  hasDelivery?:  Nullable<boolean>;
  hasLoading?:  Nullable<boolean>;
  workTimeType?: Nullable<WorkTimeType>
}
