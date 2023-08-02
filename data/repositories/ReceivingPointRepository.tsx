import request from 'utils/request'
import { IReceivingPointSearchRequest } from '@/data/interfaces/IReceivingPointSearchRequest'
import { IPagination } from '@/types/types'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'

export default class ReceivingPointRepository {
  static async search(data: IReceivingPointSearchRequest): Promise<IPagination<IReceivingPoint>> {
    const res = await request<IPagination<IReceivingPoint>>({
      method: 'post',
      url: '/api/receiving-point/search',
      data,
    })
    return res
  }
  static async fetchById(id: number): Promise<IReceivingPoint> {
    const res = await request<IReceivingPoint>({
      method: 'get',
      url: `/api/receiving-point/${id}`
    })
    return res
  }
}
