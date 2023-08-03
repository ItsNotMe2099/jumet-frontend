import IUser from '@/data/interfaces/IUser'

export default interface IChatMessageUser {
  id: number
  user: IUser
  userId: number
  messageId: number
  read: boolean
  readAt: string
  deleted: boolean
  createdAt: string
}
