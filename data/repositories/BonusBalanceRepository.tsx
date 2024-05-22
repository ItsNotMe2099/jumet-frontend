import request from 'utils/request'
import IBonusBalance from '@/data/interfaces/IBonusBalance'
import {AxiosRequestConfig} from 'axios'

export default class BonusBalanceRepository {

  static async fetch(config?: AxiosRequestConfig): Promise<IBonusBalance> {
    const res = await request<IBonusBalance>({
      url: '/api/bonus-balance',
      method: 'get',
      config,
    })
    return res
  }

}
