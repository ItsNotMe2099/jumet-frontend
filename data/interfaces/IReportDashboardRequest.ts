import {IntervalType} from '@/data/interfaces/IntervalType'
import {Nullable} from '@/types/types'

export interface IReportDashboardRequest{
  interval?: Nullable<IntervalType>,
  from?: Nullable<string>
  to?:  Nullable<string>
  receivingPointId?:  Nullable<number>
}
