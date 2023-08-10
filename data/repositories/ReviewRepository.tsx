import request from 'utils/request'
import {IPagination} from '@/types/types'
import IReview from '@/data/interfaces/IReview'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {AxiosRequestConfig} from 'axios/index'

export default class ReviewRepository {
  static async fetchByReceivingPointId(id: number, data: IPaginationRequest, config?: AxiosRequestConfig): Promise<IPagination<IReview>> {
    const res = await request<IPagination<IReview>>({
      method: 'get',
      url: `/api/review/byReceivingPoint/${id}`,
      data,
      config
    })
    return res
  }
}
