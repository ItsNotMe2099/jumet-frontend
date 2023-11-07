import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IReceivingPointUserListRequest extends IPaginationRequest {
  receivingPointId?: number
}
