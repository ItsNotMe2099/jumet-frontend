import request from 'utils/request'
import {AxiosRequestConfig} from 'axios'
import IAgreement from '@/data/interfaces/IAgreement'

export default class AgreementRepository {
  static async fetch(config?: AxiosRequestConfig): Promise<IAgreement[]> {
    const res = await request<IAgreement[]>({
      url: '/api/agreement',
      method: 'get',
      config,
    })
    return res
  }

}
