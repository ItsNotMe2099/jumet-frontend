import request from 'utils/request'
import {DeepPartial, IPagination} from '@/types/types'
import {IRepresentative} from '@/data/interfaces/IRepresentative'
import {IRepresentativeListRequest} from '@/data/interfaces/IRepresentativeListRequest'
import {AxiosRequestConfig} from 'axios/index'
import {IRepresentativeDeleteRegistrationRequest} from '@/data/interfaces/IRepresentativeDeleteRegistrationRequest'

export default class RepresentativeRepository {

  static async fetch(data: IRepresentativeListRequest, config: AxiosRequestConfig): Promise<IPagination<IRepresentative>> {
    const res = await request<IPagination<IRepresentative>>({
      method: 'get',
      url: '/api/representative',
      data,
      config
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

  static async register(data: DeepPartial<IRepresentative>): Promise<IRepresentative> {
    const res = await request<IRepresentative>({
      method: 'post',
      url: '/api/representative/registration',
      data,
    })
    return res
  }

  static async deleteRegistration(data: IRepresentativeDeleteRegistrationRequest): Promise<IRepresentative> {
    const res = await request<IRepresentative>({
      method: 'delete',
      url: '/api/representative/registration',
      data,
    })
    return res
  }

  static async update(id: string | number, data: DeepPartial<IRepresentative>): Promise<IRepresentative> {
    const res = await request<IRepresentative>({
      method: 'patch',
      url: `/api/representative/${id}`,
      data,
    })
    return res
  }

  static async delete(id: string | number): Promise<IRepresentative> {
    const res = await request<IRepresentative>({
      method: 'delete',
      url: `/api/representative/${id}`,
    })
    return res
  }

  static async resendCode(id: number | string): Promise<{code?: string}> {
    const res = await request<{code?: string}>({
      method: 'post',
      url: `/api/representative/${id}/resend-code`,
    })
    return res
  }


}
