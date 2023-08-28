import request from 'utils/request'
import {ICurrentUserUpdateRequest} from '@/data/interfaces/ICurrentUserUpdateRequest'
import IUser from '@/data/interfaces/IUser'

export default class CurrentUserRepository {

  static async update(data: ICurrentUserUpdateRequest): Promise<IUser> {
    const res = await request<IUser>({
      method: 'put',
      url: '/api/current-user',
      data,
    })
    return res
  }
  static async getApiToken(): Promise<string> {
    const res = await request<string>({
      method: 'get',
      url: '/api/current-user/api-token',
    })
    return res
  }

  static async regenerateApiToken(): Promise<string> {
    const res = await request<string>({
      method: 'put',
      url: '/api/current-user/regenerate-api-token',
    })
    return res
  }

  static async deletePassportData(): Promise<IUser> {
    const res = await request<IUser>({
      method: 'delete',
      url: '/api/current-user/passport-data',
    })
    return res
  }

}
