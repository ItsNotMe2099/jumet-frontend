import request from 'utils/request'

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
}
