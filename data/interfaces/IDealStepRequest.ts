import {DealPaymentType} from '@/data/enum/DealPaymentType'
import {TerminateReasonType} from '@/data/enum/TerminateReasonType'
import {IAddress} from '@/data/interfaces/IAddress'

export interface IDealSetUpStepRequest{
  representativeId: number,
  requiresDelivery: boolean,
  address: IAddress
  paymentType:  DealPaymentType
  deliveryDate:  string
  deliveryTimeFrom:  string
  deliveryTimeTo: string
}
export interface IDealWeighingStepRequest{
  actualWeight: number,
  actualRubbishInPercents: number,
  weighingComment: string,
  weighingPhotoId: number,
  acceptanceCertificateId: number
}
export interface IDealTermByBuyerStepRequest{
  terminateReasonType: TerminateReasonType
}
export interface IDealTermBySellerStepRequest{

}
export interface IDealWeighingAcceptStepRequest{

}
export interface IDealPayStepRequest{
  paymentReceiptId: number
}
