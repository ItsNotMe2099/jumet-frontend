import request from 'utils/request'
import {AxiosRequestConfig} from 'axios'
import {IReportDashboardRequest} from '@/data/interfaces/IReportDashboardRequest'
import IReportDashboard, {IReportDashboardRaw} from '@/data/interfaces/IReportDashboard'
import {IReportDealsRequest} from '@/data/interfaces/IReportDealsRequest'
import IReportDeals, {IReportDealsRaw} from '@/data/interfaces/IReportDeals'

export default class ReportRepository {
  static async fetchDashBoard(data: IReportDashboardRequest, config?: AxiosRequestConfig): Promise<IReportDashboard> {
    const res = await request<IReportDashboardRaw>({
      method: 'get',
      url: '/api/reports/dashboard',
      data: {...data},
      config
    })
    return {
      deals: {
        total: {
          deals_count: parseInt(res.deals.total[0].deals_count ?? '0', 10),
          completed_deals_count: parseInt(res.deals.total[0].completed_deals_count ?? '0', 10),
          active_deals_count: parseInt(res.deals.total[0].active_deals_count ?? '0', 10),
          terminated_deals_count: parseInt(res.deals.total[0].terminated_deals_count ?? '0', 10),
          deals_sub_total: parseInt(res.deals.total[0].deals_sub_total ?? '0', 10),
          completed_deals_sub_total: parseInt(res.deals.total[0].completed_deals_sub_total ?? '0', 10),
          active_deals_sub_total: parseInt(res.deals.total[0].active_deals_sub_total ?? '0', 10),
          terminated_deals_sub_total: parseInt(res.deals.total[0].terminated_deals_sub_total ?? '0', 10),
        },
        byPoint: res.deals.byPoint.map(i => ({
          receivingPointId: i.receivingPointId,
          name: i.name,
          address: i.address,
          deals_count: parseInt(i.deals_count ?? '0', 10),
          completed_deals_count: parseInt(i.completed_deals_count ?? '0', 10),
          active_deals_count: parseInt(i.active_deals_count ?? '0', 10),
          terminated_deals_count: parseInt(i.terminated_deals_count ?? '0', 10),
          deals_sub_total: parseInt(i.deals_sub_total ?? '0', 10),
          completed_deals_sub_total: parseInt(i.completed_deals_sub_total ?? '0', 10),
          active_deals_sub_total: parseInt(i.active_deals_sub_total ?? '0', 10),
          terminated_deals_sub_total: parseInt(i.terminated_deals_sub_total ?? '0', 10),
        }))
      },
      offers: {
        total: {
          offers_count: parseInt(res.offers.total[0].offers_count ?? '0', 10),
          offers_prev: parseInt(res.offers.total[0].offers_prev ?? '0', 10)
        },
        byPoint: res.offers.byPoint.map(i => ({
          receivingPointId: i.receivingPointId,
          name: i.name,
          address: i.address,
          offers_count: parseInt(i.offers_count ?? '0', 10),
          offers_prev: parseInt(i.offers_prev ?? '0', 10),
        }))
      },
      requests: {
        total: {
          requests_count: parseInt(res.requests.total[0].requests_count ?? '0', 10),
          requests_prev: parseInt(res.requests.total[0].requests_prev ?? '0', 10),
        },
        byPoint: res.requests.byPoint.map(i => ({
          receivingPointId: i.receivingPointId,
          name: i.name,
          address: i.address,
          requests_count: parseInt(i.requests_count ?? '0', 10),
          requests_prev: parseInt(i.requests_prev ?? '0', 10),
        }))
      }
    }
  }

  static async fetchDeals(data: IReportDealsRequest, config?: AxiosRequestConfig): Promise<IReportDeals> {
    const res = await request<IReportDealsRaw>({
      method: 'get',
      url: '/api/reports/deals',
      data: {...data},
      config
    })
    return {
      ...res,
      dashboard: {
        deals_count: parseInt(res.dashboard.deals_count ?? '0', 10),
        completed_deals_count: parseInt(res.dashboard.completed_deals_count ?? '0', 10),
        active_deals_count: parseInt(res.dashboard.active_deals_count ?? '0', 10),
        terminated_deals_count: parseInt(res.dashboard.terminated_deals_count ?? '0', 10),
        deals_sub_total: parseInt(res.dashboard.deals_sub_total ?? '0', 10),
        completed_deals_sub_total: parseInt(res.dashboard.completed_deals_sub_total ?? '0', 10),
        active_deals_sub_total: parseInt(res.dashboard.active_deals_sub_total ?? '0', 10),
        terminated_deals_sub_total: parseInt(res.dashboard.terminated_deals_sub_total ?? '0', 10),
      },

    }
  }
}
