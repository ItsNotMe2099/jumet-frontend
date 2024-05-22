import {BonusInvoiceStatus} from '@/data/enum/BonusInvoiceStatus'
import IFile from '@/data/interfaces/IFile'

export default interface IBonusInvoice {
  id: number;
  status: BonusInvoiceStatus;
  number: number;
  invoiceFile: IFile;
  amount: number;
  paidAt: Date;
  createdAt: Date;
}
