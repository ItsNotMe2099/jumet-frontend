import IFile from 'data/interfaces/IFile'
import {ChatMessageType} from '@/data/enum/ChatMessageType'
import IChatMessageUser from '@/data/interfaces/IChatMessageUser'

export default interface IChatMessage {
  sid?: string | null
  id?: number
  type: ChatMessageType
  message?: string
  chatId?: number
  replyTo?: IChatMessage
  forwarded?: IChatMessage
  pinned?: boolean
  replyToId?: number
  forwardedId: number
  userId?: number | string
  userStates?: IChatMessageUser[]
  assets?: IFile[]
  createdAt: string
}
