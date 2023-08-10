import request from 'utils/request'
import {DeepPartial, IPagination} from '@/types/types'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {ISaleRequestOwnerListRequest} from '@/data/interfaces/ISaleRequestOwnerListRequest'
import {omit} from '@/utils/omit'
import {AxiosRequestConfig} from 'axios/index'

export default class SaleRequestOwnerRepository {

  static async create(data: DeepPartial<ISaleRequest>): Promise<ISaleRequest> {
    const res = await request<ISaleRequest>({
      method: 'post',
      url: '/api/owner/sale-request',
      data
    })
    return res
  }


  static async update(id: number, data: DeepPartial<ISaleRequest>): Promise<ISaleRequest> {
    const res = await request<ISaleRequest>({
      method: 'patch',
      url: `/api/owner/sale-request/${id}`,
      data,
    })
    return res
  }


  static async updateByBuyer(id: number, data: DeepPartial<ISaleRequest>): Promise<ISaleRequest> {
    const res = await request<ISaleRequest>({
      method: 'put',
      url: `/api/sale-request/${id}`,
      data,
    })
    return res
  }

  static async fetch(data: ISaleRequestOwnerListRequest, config?: AxiosRequestConfig): Promise<IPagination<ISaleRequest>> {
    const res = await request<IPagination<ISaleRequest>>({
      method: 'get',
      url: '/api/owner/sale-request',
      data: {
        ...omit(data, ['statuses']),
        ...((data.statuses?.length ?? 0) > 0 ? {statuses: data.statuses?.join(',')} : {}),
        sort: 'createdAt,DESC'
      },
      config
    })
    return res
  }

  static async fetchById(id: number, token?: string): Promise<ISaleRequest> {
    const res = await request<ISaleRequest>({
      method: 'get',
      url: `/api/owner/sale-request/${id}`,
      token
    })
    return res
  }


  static async delete(id: number): Promise<ISaleRequest> {
    const res = await request<ISaleRequest>({
      method: 'delete',
      url: `/api/owner/sale-request/${id}`,
    })
    return res
  }
}
