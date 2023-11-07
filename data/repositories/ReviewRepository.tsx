import request from 'utils/request'
import {IPagination} from '@/types/types'
import IReview from '@/data/interfaces/IReview'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {AxiosRequestConfig} from 'axios/index'
export interface IReviewCreateRequest{
  dealId: number
  mark: number
  content: string
}
export interface IReviewAnswerRequest{
  dealId: number
  answer: string
}
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
  static async create(data: IReviewCreateRequest): Promise<IReview> {
    const res = await request<IReview>({
      method: 'post',
      url: '/api/review',
      data
    })
    return res
  }
  static async answer(data: IReviewAnswerRequest): Promise<IReview> {
    const res = await request<IReview>({
      method: 'post',
      url: '/api/review/answer',
      data
    })
    return res
  }
}
