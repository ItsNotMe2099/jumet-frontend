import { createContext, useContext, useState } from 'react'
import { useAppContext } from 'context/state'
import useInterval from 'use-interval'
import { ILoginResponse } from '@/data/interfaces/ILoginResponse'
import SellerRepository from '@/data/repositories/SellerRepository'
import { RequestError } from '@/types/types'
import { CookiesType, SnackbarType } from '@/types/enums'
import { LoginFormData } from '@/types/form_data/LoginFormData'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

interface IOtpError {
  show: boolean
  text: string
}


interface IState {
  signUpSpinner: boolean
  againSpinner: boolean
  confirmSpinner: boolean
  completeSpinner: boolean
  codeRes: ILoginResponse | null
  LoginFormData: LoginFormData | null
  remainSec: number
  setLoginFormData: (value: LoginFormData) => void
  signUp: (values: LoginFormData) => void
  sendCodeAgain: () => void
  confirmCode: (code: string) => Promise<boolean>
  completeRegistration: (name: string, password: string) => Promise<string>
  setSending: (value: boolean) => void
  setSendingAgain: (value: boolean) => void
  otpError: IOtpError | null
  showOtpError: (show: boolean, text: string) => void
}

const defaultValue: IState = {
  signUpSpinner: false,
  confirmSpinner: false,
  againSpinner: false,
  completeSpinner: false,
  confirmCode: async (code: string) => false,
  completeRegistration: async (name: string, password: string) => '',
  setSending: (value: boolean) => null,
  codeRes: null,
  LoginFormData: null,
  setLoginFormData: (values) => null,
  signUp: (values) => null,
  remainSec: 0,
  sendCodeAgain: () => null,
  setSendingAgain: (value) => null,
  otpError: null,
  showOtpError: (show, text) => null
}

const AuthContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AuthWrapper(props: Props) {

  const appContext = useAppContext()

  const router = useRouter()

  const [remainSec, setRemainSec] = useState<number>(0)
  const [codeRes, setCodeRes] = useState<ILoginResponse | null>(null)
  const [signUpSpinner, setSignUpSpinner] = useState<boolean>(false)
  const [confirmSpinner, setConfirmSpinner] = useState<boolean>(false)
  const [againSpinner, setAgainSpinner] = useState<boolean>(false)
  const [completeSpinner, setCompleteSpinner] = useState<boolean>(false)
  const [LoginFormData, setLoginFormData] = useState<LoginFormData | null>(null)
  const [otpError, setOtpError] = useState<IOtpError | null>(null)

  useInterval(() => {
    if (remainSec > 0) {
      setRemainSec(remainSec - 1)
    }
  }, 1000)

 // Sign up step 1
 const signUp = async (values: LoginFormData) => {
  setSignUpSpinner(true)
  setLoginFormData(values)
  const isOk = await sendCodeToPhone(values.phone)
  setSignUpSpinner(false)
  if (isOk) {
    // appContext.showModal(ModalType.signUpCode)
  }
}

const showOtpError = (show: boolean, text: string) => {
  setOtpError({ show, text })
}

// Sign up step 2
const confirmCode = async (code: string): Promise<boolean> => {
  setConfirmSpinner(true)
  let accessToken: string = ''

  try {
    accessToken = await SellerRepository.confirmCode(LoginFormData!.phone, code)
  } catch (err) {
    if (err instanceof RequestError) {
      showOtpError(true, err.message)
    }
    setConfirmSpinner(false)
    return false
  }

  if (!accessToken) {
    appContext.showSnackbar('Token error', SnackbarType.error)
    setConfirmSpinner(false)
    return false
  }

  Cookies.set(CookiesType.accessToken, accessToken, { expires: 365 })



  appContext.setModalNonSkippable(false)
  appContext.hideModal()
  appContext.hideBottomSheet()
  appContext.updateTokenFromCookies()
  setConfirmSpinner(false)
  await router.push('/CompleteRegistration')
  return true
}

/// step 3
const completeRegistration = async (name: string, password: string): Promise<string> => {
  setCompleteSpinner(true)
  let accessToken: string = ''

  try {
    accessToken = await SellerRepository.completeRegistration(name, password)
  } catch (err) {
    if (err instanceof RequestError) {
      appContext.showSnackbar(err.message, SnackbarType.error)
    }
    setCompleteSpinner(false)
    return ''
  }

  if (!accessToken) {
    appContext.showSnackbar('Token error', SnackbarType.error)
    setCompleteSpinner(false)
    return ''
  }

  Cookies.set(CookiesType.accessToken, accessToken, { expires: 365 })

  appContext.updateTokenFromCookies()
  setCompleteSpinner(false)
  return accessToken
}

const sendCodeToPhone = async (phone: string): Promise<boolean> => {
  let data: ILoginResponse

  try {
    data = await SellerRepository.sendCodeToPhone(phone)
  } catch (err) {
    if (err instanceof RequestError) {
      appContext.showSnackbar(err.message, SnackbarType.error)
    }
    return false
  }

  setCodeRes(data)
  setRemainSec(data.codeCanRetryIn ?? 0)
  return true
}

const sendCodeAgain = async () => {
  setAgainSpinner(true)
  if (LoginFormData?.phone) {
    await sendCodeToPhone(LoginFormData?.phone)
  }
  setAgainSpinner(false)
}

  const value: IState = {
    ...defaultValue,
    confirmCode,
    completeRegistration,
    signUpSpinner,
    completeSpinner,
    codeRes,
    signUp,
    LoginFormData,
    remainSec,
    sendCodeAgain,
    againSpinner,
    confirmSpinner,
    otpError,
    showOtpError
  }

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  return useContext(AuthContext)
}
