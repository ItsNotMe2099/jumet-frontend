import request from 'utils/request'
import IBonusTariff from '@/data/interfaces/IBonusTariff'
import {AxiosRequestConfig} from 'axios'

export default class BonusTariffRepository {
  static async fetch(config?: AxiosRequestConfig): Promise<IBonusTariff[]> {
    const res = await request<IBonusTariff[]>({
      url: '/api/bonus-tariff',
      method: 'get',
      config,
    })
    return res
  }
}
