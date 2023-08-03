import request from 'utils/request'
import IChat from 'data/interfaces/IChat'
import {IPagination} from 'types/types'
import IChatMessage from 'data/interfaces/IChatMessage'
import {IChatMessageFormData} from '@/types/form_data/IChatMessageFormData'

export default class ChatMessageRepository {
  static async fetchAll(chatId: number | string, lastCreatedAt: string | null = null, limit: number = 30): Promise<IPagination<IChatMessage>> {
    return request({
      url: `/api/chat/${chatId}/messages`,
      method: 'get',
      data: {
        lastCreatedAt,
        limit
      }
    })
  }
  static async search(search: string, limit: number = 30): Promise<IPagination<IChat>> {
    return request({
      url: '/api/chat/messages/search',
      method: 'get',
      data: {
        search,
        limit
      }
    })
  }
  static async setReadIds(ids: number[]): Promise<IChat | null> {
    return request({
      url: '/api/chat/messages/state',
      method: 'post',
      data: {
        ids,
        read: true
      }
    })
  }
  static async create(data: IChatMessageFormData): Promise<IChatMessage | null> {
    return request({
      url: '/api/chat/messages',
      method: 'post',
      data
    })
  }
}
