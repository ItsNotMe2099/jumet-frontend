import request from 'utils/request'
import {DeepPartial, IPagination} from '@/types/types'
import {IDealOffer} from '@/data/interfaces/IDealOffer'
import {IDealOfferListRequest} from '@/data/interfaces/IDealOfferListRequest'
import {DealOfferStatus} from '@/data/enum/DealOfferStatus'

export default class DealOfferRepository {

  static async update(id: number, data: DeepPartial<IDealOffer>): Promise<IDealOffer> {
    const res = await request<IDealOffer>({
      method: 'put',
      url: `/api/deal-offer/${id}`,
      data,
    })
    return res
  }

  static async fetch(data: IDealOfferListRequest): Promise<IPagination<IDealOffer>> {
    const res = await request<IPagination<IDealOffer>>({
      method: 'post',
      url: '/api/deal-offer',
      data,
    })
    return res
  }

  static async fetchById(id: number): Promise<IDealOffer> {
    const res = await request<IDealOffer>({
      method: 'get',
      url: `/api/deal-offer/${id}`,
    })
    return res
  }

  static async reject(id: number): Promise<IDealOffer> {
    const res = await request<IDealOffer>({
      method: 'put',
      url: `/api/deal-offer/${id}`,
      data: {
        status: DealOfferStatus.Rejected
      }
    })
    return res
  }
  static async accept(id: number): Promise<IDealOffer> {
    const res = await request<IDealOffer>({
      method: 'put',
      url: `/api/deal-offer/${id}`,
      data: {
        status: DealOfferStatus.Accepted
      }
    })
    return res
  }

}
