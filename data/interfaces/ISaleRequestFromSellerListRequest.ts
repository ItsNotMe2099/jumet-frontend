import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'

export interface ISaleRequestFromSellerListRequest extends IPaginationRequest{
  receivingPointId?: number
  statuses?: ISaleRequest[]
}
