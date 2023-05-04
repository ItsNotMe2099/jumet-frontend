import IFile from 'data/interfaces/IFile'
//import {IProfile} from 'data/interfaces/IProfile'

export default interface IAboutMe {
  id: number
  firstName: string
  lastName: string
  phone: string
  language: string
  email?: string
  isRegistrationCompleted: boolean
  totalLiked: number
  totalFeedbacks: number
  avatar?: IFile
  birthday?: string
  //profiles: IProfile[]
}
