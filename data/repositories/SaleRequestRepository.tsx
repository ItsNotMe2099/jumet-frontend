import request from 'utils/request'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import { IPagination } from '@/types/types'
import { ISaleRequestSearchRequest } from '@/data/interfaces/ISaleRequestSearchRequest'
import { ILocation } from '../interfaces/ILocation'

export default class SaleRequestRepository {

  static async search(data: ISaleRequestSearchRequest): Promise<IPagination<ISaleRequest>> {
    const res = await request<IPagination<ISaleRequest>>({
      method: 'post',
      url: '/api/sale-request/search',
      data,
    })
    return res
  }

  static async searchById(id: number): Promise<IPagination<ISaleRequest>> {
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
    return res
  }

}
