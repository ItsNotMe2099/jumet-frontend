import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {DealStatus} from '@/data/enum/DealStatus'

export interface IDealListRequest extends IPaginationRequest{
  statuses?: DealStatus[]
  id?: number
}
