import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'
import {ILocation} from '@/data/interfaces/ILocation'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'

export interface OtpCodeModalArguments extends ISendCodeResponse{
    mode: 'email' | 'phone'
    login: string,
    onConfirm: (res: IAuthResponse) => void
    onCancel?: () => void
    onSendAgain: () => Promise<ISendCodeResponse>
}
export interface MapSelectorModalArguments {
  onChange: (location: ILocation | null) => void,
  location: ILocation | null
}

export interface ConfirmModalArguments {
  onConfirm: () => void
  onCancel?: () => void
  title?: string
  text?: string
  confirm?: string,
  cancel?: string
  confirmColor?: 'red' | 'blue'
}

export interface LoginModalArguments {
  hint?: string
}
export interface DealOfferModalArguments {
  saleRequestId: number
}

export interface SaleRequestOfferModalArguments {
  receivingPointId: number
}
export interface SaleRequestFormModalArguments {
  saleRequest: ISaleRequest
}

export interface SuccessModalArguments {
  title: string
  message: string
  buttonName?: string
  buttonHref?: string
  buttonOnClick?: () => void
}
