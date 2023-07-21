import request from 'utils/request'
import {DeepPartial} from '@/types/types'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'

export default class SaleRequestOwnerRepository {

  static async create(data: DeepPartial<ISaleRequest>): Promise<ISaleRequest> {
    const res = await request<ISaleRequest>({
      method: 'post',
      url: '/api/owner/sale-request',
      data
    })
    return res
  }

  static async fetch(): Promise<ISaleRequest[]> {
    const res = await request<ISaleRequest[]>({
      method: 'get',
      url: '/api/owner/sale-request',
    })
    return res
  }

}
