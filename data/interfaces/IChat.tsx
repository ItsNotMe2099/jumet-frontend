import IUser from '@/data/interfaces/IUser'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import IChatMessage from '@/data/interfaces/IChatMessage'

export default interface IChat {
  id: number
  name: string
  published: boolean
  seller: IUser
  sellerId: number | string
  receivingPoint: IReceivingPoint
  receivingPointId: number
  last: IChatMessage
  isGroup: boolean;
  lastMessage: string
  users: IUser[]
  lastMessageAt: string
  firstReplyAt: string
  createdAt: string
  totalUnread: number
}
