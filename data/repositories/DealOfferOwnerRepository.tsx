import request from 'utils/request'
import { DeepPartial, IPagination } from '@/types/types'
import { IDealOffer } from '@/data/interfaces/IDealOffer'
import { IDealOfferOwnerListRequest } from '@/data/interfaces/IDealOfferOwnerListRequest'

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

  static async fetchByPoint(id: number): Promise<IDealOffer[]> {
    const res = await request<IDealOffer[]>({
      method: 'get',
      url: `/api/owner/deal-offer?receivingPointId=${id}`,
    })
    return res
  }

}
