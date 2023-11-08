import request from 'utils/request'
import {DeepPartial, IPagination} from '@/types/types'
import {AxiosRequestConfig} from 'axios/index'
import {IEmployeeListRequest} from '@/data/interfaces/IEmployeeListRequest'
import {IEmployeeCreateRequest} from '@/data/interfaces/IEmployeeCreateRequest'
import IEmployee from '@/data/interfaces/IEmployee'

export default class EmployeeRepository {
  static async fetch(data: IEmployeeListRequest, config?: AxiosRequestConfig): Promise<IPagination<IEmployee>> {
    const res = await request<IPagination<IEmployee>>({
      method: 'get',
      url: '/api/employee',
      data,
      config,
    })
    return res
  }

  static async update(id: string, data: DeepPartial<IEmployeeCreateRequest>): Promise<IEmployee> {
    const res = await request<IEmployee>({
      method: 'patch',
      url: `/api/employee/${id}`,
      data,
    })
    return res
  }

  static async create(data: DeepPartial<IEmployeeCreateRequest>): Promise<IEmployee> {
    const res = await request<IEmployee>({
      method: 'post',
      url: '/api/employee',
      data,
    })
    return res
  }

  static async delete(id: string): Promise<IEmployee> {
    const res = await request<IEmployee>({
      method: 'delete',
      url: `/api/employee/${id}`,
    })
    return res
  }
}
