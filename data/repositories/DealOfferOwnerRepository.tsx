import request from 'utils/request'
import {DeepPartial, IPagination} from '@/types/types'
import {IDealOffer} from '@/data/interfaces/IDealOffer'
import {IDealOfferOwnerListRequest} from '@/data/interfaces/IDealOfferOwnerListRequest'

export default class DealOfferOwnerRepository {

  static async create(data: DeepPartial<IDealOffer>): Promise<IDealOffer> {
    const res = await request<IDealOffer>({
      method: 'post',
      url: '/api/owner/deal-offer',
      data
    })
    return res
  }

  static async fetch(data: IDealOfferOwnerListRequest): Promise<IPagination<IDealOffer>> {
    const res = await request<IPagination<IDealOffer>>({
      method: 'get',
      url: '/api/owner/deal-offer',
      data,
    })
    return res
  }

}
