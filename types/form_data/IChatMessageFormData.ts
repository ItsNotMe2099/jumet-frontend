import {ChatMessageType} from '@/data/enum/ChatMessageType'

export interface IChatMessageFormData{
  sid?: string
  chatId?: number
  message?: string
  type?: ChatMessageType
  assetsIds?: number[]
}
