import IFile from '@/data/interfaces/IFile'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

export enum LegalType {
  Self = 'self',
  Fiz = 'fiz',
  Ip = 'ip',
  LegalEntity = 'legalEntity',
}
export class ICompany {
  id: number
  legalType: LegalType
  firstName: string
  lastName: string
  middleName: string
  name: string
  inn: string
  kpp: string
  address: string
  phone: string
  legalAddressSame: boolean
  legalAddress: string
  bankAccount: string
  bankBik: string
  licenseScan: IFile
  licenseScanId: number
  ownerId: string
  receivingPoints: IReceivingPoint[]
  createdAt: Date
}
