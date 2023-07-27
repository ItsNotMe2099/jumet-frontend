import IFile from '@/data/interfaces/IFile'

export interface IPassportData{
  id?: number;
  address?: string | null;
  series?: string | null;
  number?: string | null;
  date?: string | null;
  issuedBy?: string | null;
  scan?: IFile | null;
  scanId?: number | null;
}
