import request from 'utils/request'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {IPagination} from '@/types/types'
import IBonusTransaction from '@/data/interfaces/IBonusTranaction'
import {AxiosRequestConfig} from 'axios'

export default class BonusTransactionRepository {
  static async fetch(data: IPaginationRequest, config?: AxiosRequestConfig): Promise<IPagination<IBonusTransaction>> {
    const res = await request<IPagination<IBonusTransaction>>({
      url: '/api/bonus-transaction',
      method: 'get',
      data,
      config
    })
    return res
  }

}
