import request from 'utils/request'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'
import {ICompany} from '@/data/interfaces/ICompany'
import {DeepPartial} from '@/types/types'

export default class CompanyOwnerRepository {

  static async fetch(): Promise<ICompany[]> {
    const res = await request<ICompany[]>({
      method: 'post',
      url: '/api/company'
    })
    return res
  }

  static async update(id: number, data: DeepPartial<ICompany>): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
        method: 'patch',
        url: `/api/company/${id}`,
        data
      }
    )
    return res
  }
}
