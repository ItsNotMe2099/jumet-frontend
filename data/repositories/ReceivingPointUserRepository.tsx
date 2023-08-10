import request from 'utils/request'
import {IReceivingPointUserListRequest} from '@/data/interfaces/IReceivingPointUserListRequest'
import {DeepPartial, IPagination} from '@/types/types'
import {IReceivingPointUser} from '@/data/interfaces/IReceivingPointUser'

export default class ReceivingPointUserRepository {
  static async fetch(data: IReceivingPointUserListRequest): Promise<IPagination<IReceivingPointUser>> {
    const res = await request<IPagination<IReceivingPointUser>>({
      method: 'get',
      url: '/api/receiving-point-user',
      data,
    })
    return res
  }

  static async update(id: number, data: DeepPartial<IReceivingPointUser>): Promise<IReceivingPointUser> {
    const res = await request<IReceivingPointUser>({
      method: 'patch',
      url: `/api/receiving-point-user/${id}`,
      data,
    })
    return res
  }

  static async delete(id: number): Promise<IReceivingPointUser> {
    const res = await request<IReceivingPointUser>({
      method: 'delete',
      url: `/api/receiving-point-user/${id}`,
    })
    return res
  }
}
