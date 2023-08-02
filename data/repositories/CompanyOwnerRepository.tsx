import request from 'utils/request'
import {ICompany} from '@/data/interfaces/ICompany'
import {DeepPartial} from '@/types/types'

export default class CompanyOwnerRepository {

  static async fetch(): Promise<ICompany[]> {
    const res = await request<ICompany[]>({
      method: 'get',
      url: '/api/company'
    })
    return res
  }

  static async fetchById(id: number): Promise<ICompany> {
    const res = await request<ICompany>({
      method: 'get',
      url: `/api/company/${id}`
    })
    return res
  }


  static async create(data: DeepPartial<ICompany>): Promise<ICompany> {
    const res = await request<ICompany>({
        method: 'post',
        url: '/api/company',
        data
      }
    )
    return res
  }

  static async update(id: number, data: DeepPartial<ICompany>): Promise<ICompany> {
    const res = await request<ICompany>({
        method: 'patch',
        url: `/api/company/${id}`,
        data
      }
    )
    return res
  }

  static async delete(id: number): Promise<ICompany> {
    const res = await request<ICompany>({
        method: 'delete',
        url: `/api/company/${id}`,
      }
    )
    return res
  }

}
