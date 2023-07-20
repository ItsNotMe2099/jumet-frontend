import request from 'utils/request'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {IPagination} from '@/types/types'
import {ISaleRequestSearchRequest} from '@/data/interfaces/ISaleRequestSearchRequest'

export default class SaleRequestRepository {

  static async search(data: ISaleRequestSearchRequest): Promise<IPagination<ISaleRequest>> {
    const res = await request<IPagination<ISaleRequest>>({
      method: 'post',
      url: '/api/sale-request/search',
      data,
    })
    return res
  }

}
