import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'
import {ILocation} from '@/data/interfaces/ILocation'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import IFile from '@/data/interfaces/IFile'
import {IDeal} from '@/data/interfaces/IDeal'
import {IRepresentative} from '@/data/interfaces/IRepresentative'
import {Nullable} from '@/types/types'
import IEmployee from '@/data/interfaces/IEmployee'

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

export interface EmployeeFormModalArguments {
  employee: IEmployee
}

export interface RepresentativeFormModalArguments {
  representative?: Nullable<IRepresentative>
}

export interface RepresentativeSuccessModalArguments {
  representative: IRepresentative
}

export interface GalleryModalArguments {
  images: IFile[]
  title: string
  selectedSource: string
}

export interface DealTerminateFormModalArguments {
  title?: string
  text?: string
  deal: IDeal
}

export interface ChatFileUploadModalArguments {
  message?: string | null
}

