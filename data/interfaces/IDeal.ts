import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import IUser from '@/data/interfaces/IUser'
import {IDealOffer} from '@/data/interfaces/IDealOffer'
import {IAddress} from '@/data/interfaces/IAddress'
import {DealPaymentType} from '@/data/enum/DealPaymentType'
import {TerminateReasonType} from '@/data/enum/TerminateReasonType'
import IFile from '@/data/interfaces/IFile'

export interface IDeal {
  id?: number
  receivingPoint?: IReceivingPoint
  receivingPointId: number | null
  seller: IUser
  sellerId: string
  representative?: ISaleRequest
  representativeId?: string
  saleRequest?: ISaleRequest
  saleRequestId?: number
  dealOffer?: IDealOffer
  dealOfferId?: number
  manager: IUser
  managerId: string
  owner?: IUser
  ownerId?: string
  requiresDelivery: boolean
  address: IAddress
  deliveryDate: string
  deliveryTimeFrom: string
  deliveryTimeTo: string
  paymentType: DealPaymentType

  actualWeight: number;
  actualRubbishInPercents: number;
  weighingComment: string;
  weighingPhoto: IFile;
  acceptanceCertificate: IFile;
  acceptanceCertificateId: number;
  paymentReceipt: IFile;
  paymentReceiptId: number;
  terminateReasonType?: TerminateReasonType;
  setUpAt?: string;
  weighingAt?: string;
  terminatedBySellerAt?: string;
  terminatedByBuyerAt?: string;
  weighingAcceptedAt?: string;
  paidAt?: string;
  createdAt?: string
}
