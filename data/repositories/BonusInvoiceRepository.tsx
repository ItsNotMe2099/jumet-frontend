import request from 'utils/request'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import {IPagination} from '@/types/types'
import IBonusInvoice from '@/data/interfaces/IBonusInvoice'
import IBonusInvoiceCreateReq from '@/data/interfaces/IBonusInvoiceCreateReq'
import {AxiosRequestConfig} from 'axios'

export default class BonusInvoiceRepository {
  static async fetch(data: IPaginationRequest, config?: AxiosRequestConfig): Promise<IPagination<IBonusInvoice>> {
    const res = await request<IPagination<IBonusInvoice>>({
      url: '/api/bonus-invoice',
      method: 'get',
      data,
      config
    })
    return res
  }

  static async create(data: IBonusInvoiceCreateReq): Promise<IBonusInvoice> {
    const res = await request<IBonusInvoice>({
      url: '/api/bonus-invoice',
      method: 'post',
      data,
    })
    return res
  }

}
