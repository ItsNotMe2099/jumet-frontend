import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'
import {ILocation} from '@/data/interfaces/ILocation'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {IReceivingPointUser} from '@/data/interfaces/IReceivingPointUser'
import IUser from '@/data/interfaces/IUser'
import IFile from '@/data/interfaces/IFile'
import {IDeal} from '@/data/interfaces/IDeal'

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

export interface UserFormModalArguments {
  user: IUser
  receivingPointUser: IReceivingPointUser
}
export interface GalleryModalArguments {
  images: IFile[]
  title: string
  selectedId: number
}


export interface DealTerminateFormModalArguments {
  title?: string
  text?: string
  deal: IDeal
}
