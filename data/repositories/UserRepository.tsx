import request from 'utils/request'
import IAboutMe from '../interfaces/IAboutMe'
import { ILoginResponse } from '../interfaces/ILoginResponse'

export default class UserRepository {

  static async login(login: string, password: string): Promise<string> {
    const res = await request<{ accessToken: string }>({
      method: 'post',
      url: '/api/auth/login',
      data: {
        login,
        password
      },
    })
    return res.accessToken
  }

  static async fetchAboutMe(token?: string): Promise<IAboutMe> {
    return request({url: '/api/', token})
  }

  static async deleteMyFile(id: number): Promise<void> {
    return request({
      url: `/api/`,
      method: 'delete',
    })
  }
}
