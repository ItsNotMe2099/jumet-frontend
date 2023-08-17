import request from 'utils/request'
import IChat from 'data/interfaces/IChat'
import {IPagination} from 'types/types'
import {AxiosRequestConfig} from 'axios'
import {IChatListRequest} from '@/data/interfaces/IChatListRequest'

export default class ChatRepository {
  static async fetchAll(data: IChatListRequest, config?: AxiosRequestConfig): Promise<IPagination<IChat>> {
    return request({
      url: '/api/chat',
      method: 'get',
      data,
      config
    })
  }
  static async fetchChatById(id: number | string): Promise<IChat | null> {
    return request({
      url: `/api/chat/${id}`,
      method: 'get'
    })
  }

  static async fetchChatBySellerIdAndReceivingPointId(data: {receivingPointId: number, sellerId: string}): Promise<IChat | null> {
    return request({
        url: '/api/chat/check',
        method: 'post',
        data,
      }
    )
  }

  static async createChat(data: {receivingPointId: number, sellerId: string}): Promise<IChat | null> {
    return request({
        url: '/api/chat',
        method: 'post',
        data,
      }
    )
  }

  static async fetchBookingChat(bookingId: number | string): Promise<IChat | null> {
    return request({
      url: `/api/chat/booking-dialog/${bookingId}`,
      method: 'get'
    })
  }
}
