import request from 'utils/request'
import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'

export default class SellerRepository {

  static async sendCodeToPhone(phone: string): Promise<ISendCodeResponse> {
    const res = await request<ISendCodeResponse>({
      url: '/api/auth/seller/send-code',
      method: 'post',
      data: {
        phone,
      },
    })
    return res
  }

  static async confirmCode(phone: string, code: string): Promise<string> {
    const res = await request<{ accessToken: string }>({
      method: 'post',
      url: '/api/auth/seller/confirm-code',
      data: {
        phone,
        code,
      },
    })
    return res.accessToken
  }

  static async completeRegistration(name: string, password: string): Promise<string> {
    const res = await request<{ accessToken: string }>({
      method: 'post',
      url: '/api/auth/seller/complete-registration',
      data: {
        name,
        password,
      },
    })
    return res.accessToken
  }
}
