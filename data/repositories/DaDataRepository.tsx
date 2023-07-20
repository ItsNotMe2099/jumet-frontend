import request from 'utils/request'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'
import {ICompany} from '@/data/interfaces/ICompany'

export default class DaDataRepository {

  static async geocode(address: string): Promise<ICompany[]> {
    const res = await request<ICompany[]>({
      method: 'post',
      url: '/api/dadata/geocode',
      data: {address}
    })
    return res
  }

  static async ipLocate(ip: string): Promise<IAuthResponse> {
    const res = await request<IAuthResponse>({
        method: 'post',
        url: '/api/dadata/iplocate',
        data: {ip}
      }
    )
    return res
  }
}
