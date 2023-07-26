import {IPassportData} from '@/data/interfaces/IPassportData'

export interface ICurrentUserUpdateRequest {
  firstName?: string,
  lastName?: string
  patronymic?: string
  passport?: IPassportData
}
