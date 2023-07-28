import request from 'utils/request'
import {DeepPartial} from '@/types/types'
import {IDealOffer} from '@/data/interfaces/IDealOffer'

export default class DealOfferOwnerRepository {

  static async create(data: DeepPartial<IDealOffer>): Promise<IDealOffer> {
    const res = await request<IDealOffer>({
      method: 'post',
      url: '/api/owner/deal-offer',
      data
    })
    return res
  }

  static async fetch(): Promise<IDealOffer[]> {
    const res = await request<IDealOffer[]>({
      method: 'get',
      url: '/api/owner/deal-offer',
    })
    return res
  }

}
