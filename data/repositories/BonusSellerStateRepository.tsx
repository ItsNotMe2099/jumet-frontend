import request from 'utils/request'
import IBonusSellerState from '@/data/interfaces/IBonusSellerState'
import {BonusType} from '@/data/enum/BonusType'
import {AxiosRequestConfig} from 'axios/index'

export default class BonusSellerStateRepository {
  static async fetch({types}: {types: BonusType[]}, config?: AxiosRequestConfig): Promise<IBonusSellerState[]> {
    const res = await request<IBonusSellerState[]>({
      url: '/api/bonus-seller-state',
      method: 'get',
      data: {
        ...(types ? {types: types.join(',')} : {}),
      },
      config
    })
    return res
  }
}
