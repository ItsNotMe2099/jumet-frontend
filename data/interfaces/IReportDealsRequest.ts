import {IntervalType} from '@/data/interfaces/IntervalType'
import {Nullable} from '@/types/types'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IReportDealsRequest extends IPaginationRequest{
  interval?:  Nullable<IntervalType>,
  from?: Nullable<string>
  to?:  Nullable<string>
}
