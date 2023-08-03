import request from 'utils/request'
import IChat from 'data/interfaces/IChat'
import {IPagination} from 'types/types'
import {AxiosRequestConfig} from 'axios'

export default class ChatRepository {
  static async fetchAll(page: number = 1, limit: number = 30, search?: string,  config?: AxiosRequestConfig): Promise<IPagination<IChat>> {
    return request({
      url: '/api/chat',
      method: 'get',
      data: {
        page,
        limit,
      ...(search ? {search} : {}),
      },
      config
    })
  }
  static async fetchChatById(id: number | string): Promise<IChat | null> {
    return request({
      url: `/api/chat/${id}`,
      method: 'get'
    })
  }
  static async fetchBookingChat(bookingId: number | string): Promise<IChat | null> {
    return request({
      url: `/api/chat/booking-dialog/${bookingId}`,
      method: 'get'
    })
  }
}
