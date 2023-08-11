import request from 'utils/request'
import {DeepPartial} from '@/types/types'
import {IRepresentative} from '@/data/interfaces/IRepresentative'

export default class RepresentativeRepository {

  static async fetch(): Promise<IRepresentative[]> {
    const res = await request<IRepresentative[]>({
      method: 'get',
      url: '/api/representative'
    })
    return res
  }
  static async create(data: DeepPartial<IRepresentative>): Promise<IRepresentative> {
    const res = await request<IRepresentative>({
      method: 'post',
      url: '/api/representative',
      data,
    })
    return res
  }

  static async update(id: string, data: DeepPartial<IRepresentative>): Promise<IRepresentative> {
    const res = await request<IRepresentative>({
      method: 'patch',
      url: `/api/representative/${id}`,
      data,
    })
    return res
  }

  static async delete(id: string): Promise<IRepresentative> {
    const res = await request<IRepresentative>({
      method: 'delete',
      url: `/api/representative/${id}`,
    })
    return res
  }

}
