import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {SaleRequestStatus} from '@/data/enum/SaleRequestStatus'

export interface ISaleRequestOwnerListRequest extends IPaginationRequest {
  statuses?: SaleRequestStatus[]
}
