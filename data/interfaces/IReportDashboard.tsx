import {IAddress} from '@/data/interfaces/IAddress'
export interface  IReportDashboardDealsTotal<T> {
  deals_count: T,
  completed_deals_count: T,
  active_deals_count: T,
  terminated_deals_count: T,
  deals_sub_total: T,
  completed_deals_sub_total: T,
  active_deals_sub_total: T,
  terminated_deals_sub_total: T
}
export interface  IReportDashboardOffersTotal<T> {
  offers_count: T
  offers_prev: T
}
export interface  IReportDashboardRequestsTotal<T>{
  requests_count: T
  requests_prev: T
}
export interface IReportDashboardReceivingPointDetails{
  receivingPointId: number,
  name: string
  address: IAddress,
}

export  interface IReportDashboardRaw {
  deals: {
    total: IReportDashboardDealsTotal<string>[],
    byPoint: (IReportDashboardDealsTotal<string> & IReportDashboardReceivingPointDetails)[]
  },
  offers: {
    total: IReportDashboardOffersTotal<string>[],
    byPoint: (IReportDashboardReceivingPointDetails &  IReportDashboardOffersTotal<string>)[]
  },
  requests: {
    total: IReportDashboardRequestsTotal<string>[]
    byPoint: (IReportDashboardReceivingPointDetails &  IReportDashboardRequestsTotal<string>)[]
  }
}

export default interface IReportDashboard {
  deals: {
    total: IReportDashboardDealsTotal<number>,
    byPoint: (IReportDashboardDealsTotal<number> & IReportDashboardReceivingPointDetails)[]
  },
  offers: {
    total: IReportDashboardOffersTotal<number>,
    byPoint: (IReportDashboardReceivingPointDetails &  IReportDashboardOffersTotal<number>)[]
  },
  requests: {
    total: IReportDashboardRequestsTotal<number>
    byPoint: (IReportDashboardReceivingPointDetails &  IReportDashboardRequestsTotal<number>)[]
  }
}
