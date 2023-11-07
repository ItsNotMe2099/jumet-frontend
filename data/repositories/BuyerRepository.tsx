import request from 'utils/request'
import IUser from '../interfaces/IUser'

export default class BuyerRepository {

  static async sendEmail(accountName: string, email: string, password: string): Promise<string> {
    const res = await request<{ accessToken: string }>({
      url: `/api/auth/buyer/register`,
      method: 'post',
      data: {
        accountName,
        email,
        password
      },
    })
    return res.accessToken
  }

  static async fetchEmployees(): Promise<IUser[]> {
    const res = await request<IUser[]>({
      url: `/api/user`,
      method: 'get',
    })
    return res
  }
}
