import {DealPaymentType} from '@/data/enum/DealPaymentType'
import {TerminateReasonType} from '@/data/enum/TerminateReasonType'
import {IAddress} from '@/data/interfaces/IAddress'
import {Nullable} from '@/types/types'
import {ILocation} from '@/data/interfaces/ILocation'

export interface IDealSetUpStepRequest{
  representativeId: Nullable<number>,
  requiresDelivery: boolean,
  requiresLoading: boolean,
  address: Nullable<IAddress>
  location: Nullable<ILocation>
  paymentType:  Nullable<DealPaymentType>
  deliveryDate:  Nullable<string>
  deliveryTimeFrom:  Nullable<string>
  deliveryTimeTo: Nullable<string>
  card: Nullable<string>
}
export interface IDealWeighingStepRequest{
  actualWeight: Nullable<number>,
  actualRubbishInPercents: Nullable<number>,
  weighingComment: Nullable<string>,
  weighingPhotoId?: Nullable<number>,
  acceptanceCertificateId?: Nullable<number>
  price: Nullable<number>,
  deliveryPrice: Nullable<number>,
  loadingPrice: Nullable<number>,
}
export interface IDealTermByBuyerStepRequest{
  terminateReasonType: TerminateReasonType
}
export interface IDealTermBySellerStepRequest{

}
export interface IDealWeighingAcceptStepRequest{

}
export interface IDealPayStepRequest{
  paymentReceiptId?: number | null
}
