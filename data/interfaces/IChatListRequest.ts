import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {Nullable} from '@/types/types'

export interface IChatListRequest extends IPaginationRequest{
  search?: Nullable<string>,
  receivingPointId?: Nullable<number>,
  dealId?: Nullable<number>,
  userId?: Nullable<number>,

}
