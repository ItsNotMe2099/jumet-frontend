import { createContext, useContext, useEffect, useState } from 'react'
import { SnackbarData } from 'types/types'
import {ModalType, SnackbarType} from 'types/enums'
import ReactModal from 'react-modal'
import { getIsMobile } from 'utils/mobile'
import { SwitchState } from '@/data/enum/SwitchState'

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
  regMode: SwitchState
  switchRegMode: (mode: SwitchState) => void
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
  regMode: SwitchState.FirstOption,
  switchRegMode: (mode) => null

}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
}

export function AppWrapper(props: Props) {
  const [modal, setModal] = useState<ModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any>(null)
  const [bottomSheet, setBottomSheet] = useState<ModalType | null>(null)
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(props.isMobile)

  const [regMode, setRegMode] = useState<SwitchState>(SwitchState.Secondoption)

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
    showModal,
    showBottomSheet,
    showSnackbar: (text, type: SnackbarType) => {
      setSnackbar({ text, type })
      setTimeout(() => {
        setSnackbar(null)
      }, 2000)
    },
    hideModal,
    hideBottomSheet,
    regMode,
    switchRegMode: (mode: SwitchState) => {
      setRegMode(mode)
    }
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
