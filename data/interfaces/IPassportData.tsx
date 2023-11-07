import IFile from '@/data/interfaces/IFile'
import {Nullable} from '@/types/types'

export interface IPassportData{
  id?: Nullable<number>;
  address?: Nullable<string>;
  series?: Nullable<string>;
  number?: Nullable<string>;
  date?: Nullable<string>;
  issuedBy?: Nullable<string>;
  scan?: Nullable<IFile | null>;
  scanId?: Nullable<number | null>;
}
