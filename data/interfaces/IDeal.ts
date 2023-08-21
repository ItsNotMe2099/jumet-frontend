import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import IUser from '@/data/interfaces/IUser'
import {IDealOffer} from '@/data/interfaces/IDealOffer'
import {IAddress} from '@/data/interfaces/IAddress'
import {DealPaymentType} from '@/data/enum/DealPaymentType'
import {TerminateReasonType} from '@/data/enum/TerminateReasonType'
import IFile from '@/data/interfaces/IFile'
import {DealStatus} from '@/data/enum/DealStatus'
import IReview from '@/data/interfaces/IReview'
import {Nullable} from '@/types/types'
import {ILocation} from '@/data/interfaces/ILocation'
import {IRepresentative} from '@/data/interfaces/IRepresentative'

export interface IDeal {
  id: number
  status: DealStatus
  receivingPoint: IReceivingPoint
  receivingPointId: number | null
  seller: IUser
  sellerId: string
  representative?: IRepresentative
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
  requiresLoading: boolean
  deliveryPrice: number
  loadingPrice: number
  address: IAddress
  location: ILocation
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
  setUpAt: Nullable<string>;
  weighingAt: Nullable<string>;
  terminatedBySellerAt?: Nullable<string>;
  terminatedByBuyerAt?: Nullable<string>;
  weighingAcceptedAt?: Nullable<string>;
  review?: IReview
  paidAt: Nullable<string>;
  createdAt?: string
  total: Nullable<number>
  subTotal: Nullable<number>
  distance?: Nullable<number>
}
