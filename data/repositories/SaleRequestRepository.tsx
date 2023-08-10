import request from 'utils/request'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {IPagination} from '@/types/types'
import {ISaleRequestSearchRequest} from '@/data/interfaces/ISaleRequestSearchRequest'
import {ISaleRequestFromSellerListRequest} from '@/data/interfaces/ISaleRequestFromSellerListRequest'
import {AxiosRequestConfig} from 'axios/index'

export default class SaleRequestRepository {

  static async search(data: ISaleRequestSearchRequest, config?: AxiosRequestConfig): Promise<IPagination<ISaleRequest>> {
    const res = await request<IPagination<ISaleRequest>>({
      method: 'post',
      url: '/api/sale-request/search',
      data,
      config
    })
    return res
  }

  static async fetchById(id: number, token?: string): Promise<ISaleRequest | null> {
    const res = await request<IPagination<ISaleRequest>>({
      method: 'post',
      url: '/api/sale-request/search',
      data: {
        location: {
          lat: 56.795132,
          lng: 40.1633231
        },
        id: id
      },
      token
    })
    console.log('res?.data111', res?.data)
    return res?.data?.length > 0 ? res.data[0] : null
  }

  static async fetchSaleRequestsFromSeller(data: ISaleRequestFromSellerListRequest, config?: AxiosRequestConfig): Promise<IPagination<ISaleRequest>> {
    const res = await request<IPagination<ISaleRequest>>({
      method: 'post',
      url: '/api/sale-request',
      data: {...data, sort: 'id,DESC'},
      config
    })
    return res
  }
}
