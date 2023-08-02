import request from 'utils/request'
import {DeepPartial} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import IUser from '@/data/interfaces/IUser'

export default class ReceivingPointOwnerRepository {

  static async create(data: DeepPartial<IReceivingPoint>): Promise<IReceivingPoint> {
    const res = await request<IReceivingPoint>({
      method: 'post',
      url: '/api/owner/receiving-point',
      data,
    })
    return res
  }

  static async update(id: number, data: DeepPartial<IReceivingPoint>): Promise<IReceivingPoint> {
    const res = await request<IReceivingPoint>({
      method: 'patch',
      url: `/api/owner/receiving-point/${id}`,
      data,
    })
    return res
  }

  static async fetchById(id: number): Promise<IReceivingPoint> {
    const res = await request<IReceivingPoint>({
      method: 'get',
      url: `/api/owner/receiving-point/${id}`,
    })
    return res
  }

  static async fetch(): Promise<IReceivingPoint[]> {
    const res = await request<IReceivingPoint[]>({
      method: 'get',
      url: '/api/owner/receiving-point',
    })
    return res
  }

  static async fetchUsers(receivingPointId: number): Promise<IUser[]> {
    const res = await request<IUser[]>({
      method: 'get',
      url: '/api/user',
      data: {receivingPointId}
    })
    return res
  }

  static async delete(id: number): Promise<IReceivingPoint> {
    const res = await request<IReceivingPoint>({
      method: 'delete',
      url: `/api/owner/receiving-point/${id}`,
    })
    return res
  }
}
