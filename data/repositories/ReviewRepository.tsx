import request from 'utils/request'
import {IPagination} from '@/types/types'
import IReview from '@/data/interfaces/IReview'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export default class ReviewRepository {
  static async fetchByReceivingPointId(id: number, data: IPaginationRequest): Promise<IPagination<IReview>> {
    const res = await request<IPagination<IReview>>({
      method: 'get',
      url: `/api/review/byReceivingPoint/${id}`,
      data
    })
    return res
  }
}
