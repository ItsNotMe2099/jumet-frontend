import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IEmployeeListRequest extends IPaginationRequest {
  receivingPointId?: number
  search?: string
}
