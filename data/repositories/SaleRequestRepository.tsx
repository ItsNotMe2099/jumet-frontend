import request from 'utils/request'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import { IPagination } from '@/types/types'
import { ISaleRequestSearchRequest } from '@/data/interfaces/ISaleRequestSearchRequest'
import {ISaleRequestFromSellerListRequest} from '@/data/interfaces/ISaleRequestFromSellerListRequest'

export default class SaleRequestRepository {

  static async search(data: ISaleRequestSearchRequest): Promise<IPagination<ISaleRequest>> {
    const res = await request<IPagination<ISaleRequest>>({
      method: 'post',
      url: '/api/sale-request/search',
      data,
    })
    return res
  }

  static async fetchById(id: number): Promise<ISaleRequest | null> {
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
    })
    console.log('res?.data111', res?.data)
    return res?.data?.length > 0 ? res.data[0] : null
  }

  static async fetchSaleRequestsFromSeller(data: ISaleRequestFromSellerListRequest): Promise<IPagination<ISaleRequest>> {
    const res = await request<IPagination<ISaleRequest>>({
      method: 'post',
      url: '/api/sale-request',
      data
    })
    return res
  }
}
