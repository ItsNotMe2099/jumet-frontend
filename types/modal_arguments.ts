import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'
import {ILocation} from '@/data/interfaces/ILocation'

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
  text?: string
  confirm?: string,
  cancel?: string
}
