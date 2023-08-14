import request from 'utils/request'
import { AxiosRequestConfig } from 'axios'
import { IPagination } from '@/types/types'
import { IDealListRequest } from '@/data/interfaces/IDeaListRequest'
import { IDeal } from '@/data/interfaces/IDeal'
import {
  IDealPayStepRequest,
  IDealSetUpStepRequest,
  IDealTermByBuyerStepRequest,
  IDealWeighingStepRequest
} from '@/data/interfaces/IDealStepRequest'

export default class DealRepository {


  static async fetch(data: IDealListRequest, config?: AxiosRequestConfig): Promise<IPagination<IDeal>> {
    const res = await request<IPagination<IDeal>>({
      method: 'get',
      url: '/api/deal',
      data: { ...data, sort: 'id,DESC' },
      config
    })
    return res
  }

  static async fetchWithoutParams(): Promise<IDeal[]> {
    const res = await request<IDeal[]>({
      method: 'get',
      url: '/api/deal',
    })
    return res
  }


  static async fetchById(id: number): Promise<IDeal> {
    const res = await request<IDeal>({
      method: 'get',
      url: `/api/deal/${id}`,
    })
    return res
  }


  static async setUp(id: number, data: IDealSetUpStepRequest): Promise<IDeal> {
    const res = await request<IDeal>({
      method: 'post',
      url: `/api/deal/${id}/setUp`,
      data
    })
    return res
  }

  static async weighing(id: number, data: IDealWeighingStepRequest): Promise<IDeal> {
    const res = await request<IDeal>({
      method: 'post',
      url: `/api/deal/${id}/weighing`,
      data
    })
    return res
  }
  static async terminateBySeller(id: number): Promise<IDeal> {
    const res = await request<IDeal>({
      method: 'post',
      url: `/api/deal/${id}/terminateBySeller`,
    })
    return res
  }
  static async terminateByBuyer(id: number, data: IDealTermByBuyerStepRequest): Promise<IDeal> {
    const res = await request<IDeal>({
      method: 'post',
      url: `/api/deal/${id}/terminateByBuyer`,
      data
    })
    return res
  }
  static async weighingAccept(id: number): Promise<IDeal> {
    const res = await request<IDeal>({
      method: 'post',
      url: `/api/deal/${id}/weighingAccept`,
    })
    return res
  }
  static async pay(id: number, data: IDealPayStepRequest): Promise<IDeal> {
    const res = await request<IDeal>({
      method: 'post',
      url: `/api/deal/${id}/pay`,
      data,
    })
    return res
  }


}
