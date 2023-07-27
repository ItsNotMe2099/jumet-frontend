import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'
import {IAuthResponse} from '@/data/interfaces/IAuthResponse'

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
