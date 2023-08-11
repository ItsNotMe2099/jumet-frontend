import {IPassportData} from '@/data/interfaces/IPassportData'

export interface IRepresentative{
  id: string;
  firstName: string | null,
  lastName: string | null,
  patronymic: string | null,
  passport: IPassportData
}
