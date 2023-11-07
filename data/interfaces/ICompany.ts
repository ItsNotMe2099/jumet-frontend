import IFile from '@/data/interfaces/IFile'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

export enum LegalType {
  Self = 'self',
  Fiz = 'fiz',
  Ip = 'ip',
  LegalEntity = 'legalEntity',
}
export interface ICompany {
  id?: number
  legalType?: LegalType | null
  firstName?: string
  lastName?: string
  middleName?: string
  name?: string | null
  inn?: string| null
  kpp?: string| null
  ogrn?: string| null
  address?: string | null
  phone?: string | null
  legalAddressSame?: boolean | null
  legalAddress?: string | null
  bankAccount?: string | null
  bankBik?: string | null
  licenseScan?: IFile | null
  licenseScanId?: number | null
  ownerId?: string | null
  receivingPoints?: IReceivingPoint[]
  createdAt?: Date
}
