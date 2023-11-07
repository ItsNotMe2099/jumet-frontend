import {IDeal} from '@/data/interfaces/IDeal'
import {IPagination} from '@/types/types'
export interface  IReportDealsTotal<T> {
  deals_count: T,
  completed_deals_count: T,
  active_deals_count: T,
  terminated_deals_count: T,
  deals_sub_total: T,
  completed_deals_sub_total: T,
  active_deals_sub_total: T,
  terminated_deals_sub_total: T
}
export  interface IReportDealsRaw extends IPagination<IDeal>{
  dashboard: IReportDealsTotal<string>
}

export default interface IReportDeals extends IPagination<IDeal> {
  dashboard?: IReportDealsTotal<number>
}
