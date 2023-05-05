import { createContext, useContext, useEffect, useState } from 'react'
import { SnackbarData } from 'types/types'
import { CookiesType, ModalType, SnackbarType } from 'types/enums'
import ReactModal from 'react-modal'
import { getIsMobile } from 'utils/mobile'
import IAboutMe from '@/data/interfaces/IAboutMe'
import UserRepository from '@/data/repositories/UserRepository'
import Cookies from 'js-cookie'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  modal: ModalType | null
  modalArguments: any
  bottomSheet: ModalType | null
  snackbar: SnackbarData | null
  showModal: (type: ModalType, args?: any) => void
  showBottomSheet: (type: ModalType, args?: any) => void
  hideModal: () => void
  hideBottomSheet: () => void
  showSnackbar: (text: string, type: SnackbarType) => void
  updateAboutMe: (newUser?: IAboutMe) => void
  setModalNonSkippable: (val: boolean) => void
  updateTokenFromCookies: () => void
  token: string | null
}


const ModalsBottomSheet: ModalType[] = [

]

const defaultValue: IState = {
  isMobile: false,
  isDesktop: true,
  modal: null,
  modalArguments: null,
  bottomSheet: null,
  snackbar: null,
  showModal: (type) => null,
  showBottomSheet: (type) => null,
  hideModal: () => null,
  hideBottomSheet: () => null,
  showSnackbar: (text, type) => null,
  updateAboutMe: () => null,
  setModalNonSkippable: (val) => null,
  updateTokenFromCookies: () => null,
  token: null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
}

export function AppWrapper(props: Props) {
  const [modal, setModal] = useState<ModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any>(null)
  const [bottomSheet, setBottomSheet] = useState<ModalType | null>(null)
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(props.isMobile)
  const [modalNonSkippable, setModalNonSkippable] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(props.token ?? null)
  const [aboutMe, setAboutMe] = useState<IAboutMe | null>(null)

  useEffect(() => {
    setToken(props.token ?? null)
    if (props.token && !aboutMe) {
      updateAboutMe()
    }
    if (!props.token && aboutMe) {
      setAboutMe(null)
    }
  }, [props.token])

  /** update user data from the server or just set them if passed to parameter */
  const updateAboutMe = async (newUser?: IAboutMe) => {
    if (newUser) {
      setAboutMe(newUser)
    } else {
      const data = await UserRepository.fetchAboutMe()
      if (data) {
        setAboutMe(data)
      }
    }
  }

  useEffect(() => {
    setIsMobile(getIsMobile(props.isMobile))
  }, [])

  const showModal = (type: ModalType, args?: any) => {
    if (props.isMobile && ModalsBottomSheet.includes(type)) {
      showBottomSheet(type, args)
      return
    }

    ReactModal.setAppElement('body')
    setModalArguments(args)
    setModal(type)
    if (bottomSheet) {
      hideBottomSheet()
    }
  }

  const hideModal = () => {
    if (bottomSheet) {
      hideBottomSheet()
      return
    }
    setModal(null)
    setModalArguments(null)
  }

  const showBottomSheet = (type: ModalType, props?: any) => {
    ReactModal.setAppElement('body')
    setModalArguments(props)
    setBottomSheet(type)
  }

  const hideBottomSheet = () => {
    setBottomSheet(null)
  }

  const value: IState = {
    ...defaultValue,
    isMobile: isMobile,
    isDesktop: !props.isMobile,
    modal,
    modalArguments,
    bottomSheet,
    snackbar,
    updateAboutMe,
    showModal,
    showBottomSheet,
    showSnackbar: (text, type: SnackbarType) => {
      setSnackbar({ text, type })
      setTimeout(() => {
        setSnackbar(null)
      }, 2000)
    },
    hideModal,
    token,
    hideBottomSheet,
    updateTokenFromCookies: async () => {
      const oldToken = token
      const newToken = Cookies.get(CookiesType.accessToken) ?? null
      setToken(newToken)
    },
  }


  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
