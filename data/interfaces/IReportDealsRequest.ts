import {IntervalType} from '@/data/interfaces/IntervalType'
import {Nullable} from '@/types/types'

export interface IReportDealsRequest{
  interval?:  Nullable<IntervalType>,
  from?: Nullable<string>
  to?:  Nullable<string>
}
