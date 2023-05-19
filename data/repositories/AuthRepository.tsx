import request from 'utils/request'
import IAboutMe from '../interfaces/IAboutMe'
import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'

export default class AuthRepository {

  static async sellerSendCode(phone: string): Promise<ISendCodeResponse> {
    const res = await request<ISendCodeResponse>({
      method: 'post',
      url: '/api/auth/seller/send-code',
      data: {
        phone
      },
    })
    return res
  }

  static async sellerConfirmCode(data: { phone: string, code: string }): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
        method: 'post',
        url: '/api/auth/seller/confirm-code',
        data
      }
    )
    return res
  }

  static async sellerCompleteRegistration(data: { name: string, password: string }): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
        method: 'post',
        url: '/api/auth/seller/complete-registration',
        data,
      }
    )
    return res
  }

  static async passwordReset(login: string): Promise<ISendCodeResponse> {
    const res = await request<ISendCodeResponse>({
      method: 'post',
      url: '/api/auth/passwordReset',
      data: {
        login
      },
    })
    return res
  }

  static async passwordSet(data: { code: string, newPassword: string, login: string }): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
      method: 'post',
      url: '/api/auth/passwordSet',
      data,
    })
    return res
  }

  static async buyerRegister(data: { companyName: string, email: string, password: string }): Promise<ISendCodeResponse> {
    const res = await request<ISendCodeResponse>({
      url: '/api/auth/buyer/register',
      method: 'post',
      data,
    })
    return res
  }


  static async buyerCompleteRegistration(data: { email: string, code: string }): Promise<string> {
    const res = await request<{ accessToken: string }>({
      url: '/api/auth/buyer/complete-registration',
      method: 'post',
      data,
    })
    return res.accessToken
  }

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
    return request({url: '/api/auth/currentUser', token})
  }

  static async deleteMyFile(id: number): Promise<void> {
    return request({
      url: '/api/',
      method: 'delete',
    })
  }
}
