import {DealOfferStatus} from '@/data/enum/DealOfferStatus'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IDealOfferListRequest extends IPaginationRequest{
  statuses?: DealOfferStatus[]
  new?: string
}
