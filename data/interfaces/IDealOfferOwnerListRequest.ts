import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {DealOfferStatus} from '@/data/enum/DealOfferStatus'

export interface IDealOfferOwnerListRequest extends IPaginationRequest {
  receivingPointId?: number
  statuses?: DealOfferStatus[]
}
