import {IPassportData} from '@/data/interfaces/IPassportData'
import {Nullable} from '@/types/types'
import IUser from '@/data/interfaces/IUser'

export interface IRepresentative{
  id: number | string;
  firstName: Nullable<string | null>,
  lastName: Nullable<string | null>,
  patronymic: Nullable<string | null>,
  passport: IPassportData
  phone: Nullable<string | null>
  code?: Nullable<string>
  isRegistered: boolean
  isConfirmedPi: boolean
  owner?: IUser
}
