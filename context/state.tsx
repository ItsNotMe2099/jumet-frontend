import {createContext, useContext, useEffect, useState} from 'react'
import {RequestError, SnackbarData} from 'types/types'
import {CookiesType, ModalType, SnackbarType} from 'types/enums'
import ReactModal from 'react-modal'
import {getIsMobile} from 'utils/mobile'
import IAboutMe from '@/data/interfaces/IAboutMe'
import AuthRepository from '@/data/repositories/AuthRepository'
import Cookies from 'js-cookie'
import {Subject} from 'rxjs'
import {CookiesLifeTime} from '@/types/constants'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {ICompany} from '@/data/interfaces/ICompany'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {IDealOffer} from '@/data/interfaces/IDealOffer'
import IUser from '@/data/interfaces/IUser'
import {IReceivingPointUser} from '@/data/interfaces/IReceivingPointUser'
import {IDeal} from '@/data/interfaces/IDeal'
import IReview from '@/data/interfaces/IReview'
import {IRepresentative} from '@/data/interfaces/IRepresentative'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  isLogged: boolean
  aboutMeLoaded: boolean
  allLoaded: boolean
  loginState$: Subject<boolean>
  modal: ModalType | null
  modalArguments: any
  bottomSheet: ModalType | null
  snackbar: SnackbarData | null
  aboutMe: IAboutMe | null
  showModal: (type: ModalType, args?: any) => void
  showBottomSheet: (type: ModalType, args?: any) => void
  hideModal: () => void
  hideBottomSheet: () => void
  setToken: (token: string) => void
  showSnackbar: (text: string, type: SnackbarType) => void
  updateAboutMe: (newUser?: IAboutMe) => Promise<IAboutMe | null>
  setModalNonSkippable: (val: boolean) => void
  logout: () => void,
  token: string | null

  receivingPointUpdateState$: Subject<IReceivingPoint>
  receivingPointDeleteState$: Subject<IReceivingPoint>
  saleRequestUpdateState$: Subject<ISaleRequest>
  saleRequestDeleteState$: Subject<ISaleRequest>
  dealOfferUpdateState$: Subject<IDealOffer>
  dealOfferDeleteState$: Subject<IDealOffer>
  dealUpdateState$: Subject<IDeal>
  companyUpdateState$: Subject<ICompany>
  companyDeleteState$: Subject<ICompany>
  userCreateState$: Subject<IUser>
  userUpdateState$: Subject<IUser>
  userDeleteState$: Subject<IUser>
  receivingPointCreateState$: Subject<IReceivingPointUser>
  receivingPointUserUpdateState$: Subject<IReceivingPointUser>
  receivingPointUserDeleteState$: Subject<IReceivingPointUser>
  reviewCreateState$: Subject<IReview>
  reviewUpdateState$: Subject<IReview>
  representativeCreateState$: Subject<IRepresentative>
  representativeUpdateState$: Subject<IRepresentative>
  representativeDeleteState$: Subject<IRepresentative>
  fileUploadingState$: Subject<boolean>
  setIsFilesUploading: (value: boolean) => void
  isFilesUploading: boolean
}

const loginState$ = new Subject<boolean>()
const receivingPointUpdateState$ = new Subject<IReceivingPoint>()
const receivingPointDeleteState$ = new Subject<IReceivingPoint>()
const saleRequestUpdateState$ = new Subject<ISaleRequest>()
const saleRequestDeleteState$ = new Subject<ISaleRequest>()
const dealOfferUpdateState$ = new Subject<IDealOffer>()
const dealOfferDeleteState$ = new Subject<IDealOffer>()
const dealUpdateState$ = new Subject<IDeal>()
const companyUpdateState$ = new Subject<ICompany>()
const companyDeleteState$ = new Subject<ICompany>()
const userCreateState$ = new Subject<IUser>()
const userUpdateState$ = new Subject<IUser>()
const userDeleteState$ = new Subject<IUser>()
const receivingPointCreateState$ = new Subject<IReceivingPointUser>()
const receivingPointUserUpdateState$ = new Subject<IReceivingPointUser>()
const receivingPointUserDeleteState$ = new Subject<IReceivingPointUser>()
const reviewCreateState$ = new Subject<IReview>()
const reviewUpdateState$ = new Subject<IReview>()

const representativeCreateState$ = new Subject<IRepresentative>()
const representativeUpdateState$ = new Subject<IRepresentative>()
const representativeDeleteState$ = new Subject<IRepresentative>()
const fileUploadingState$ = new Subject<boolean>()

const ModalsBottomSheet: ModalType[] = []

const defaultValue: IState = {
  isMobile: false,
  isDesktop: true,
  isLogged: false,
  aboutMeLoaded: false,
  allLoaded: false,
  modal: null,
  modalArguments: null,
  bottomSheet: null,
  snackbar: null,
  aboutMe: null,
  loginState$: loginState$,
  receivingPointUpdateState$,
  receivingPointDeleteState$,
  saleRequestUpdateState$,
  saleRequestDeleteState$,
  dealOfferUpdateState$,
  dealOfferDeleteState$,
  dealUpdateState$,
  companyUpdateState$,
  companyDeleteState$,
  userCreateState$,
  userUpdateState$,
  userDeleteState$,
  receivingPointCreateState$,
  receivingPointUserUpdateState$,
  receivingPointUserDeleteState$,
  reviewCreateState$,
  reviewUpdateState$,
  representativeCreateState$,
  representativeUpdateState$,
  representativeDeleteState$,
  fileUploadingState$,
  showModal: (type) => null,
  showBottomSheet: (type) => null,
  hideModal: () => null,
  hideBottomSheet: () => null,
  setToken: (token: string) => null,
  showSnackbar: (text, type) => null,
  updateAboutMe: async () => null,
  setModalNonSkippable: (val) => null,
  logout: () => null,
  token: null,
  setIsFilesUploading: (value) => null,
  isFilesUploading: false
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string | undefined
}

export function AppWrapper(props: Props) {
  //  const router = useRouter()
  const [modal, setModal] = useState<ModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<any>(null)
  const [bottomSheet, setBottomSheet] = useState<ModalType | null>(null)
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [isMobile, setIsMobile] = useState<boolean>(props.isMobile)
  const [modalNonSkippable, setModalNonSkippable] = useState<boolean>(false)
  const [token, setToken] = useState<string | null>(props.token ?? null)
  const [aboutMe, setAboutMe] = useState<IAboutMe | null>(null)
  const [aboutMeLoaded, setAboutMeLoaded] = useState<boolean>(false)
  const [isLogged, setIsLogged] = useState<boolean>(false)
  const [allLoaded, setAllLoaded] = useState<boolean>(false)
  const [isFilesUploading, setIsFilesUploading] = useState<boolean>(false)
  useEffect(() => {
    if (props.token) {
      setIsLogged(true)
    } else {
      setIsLogged(false)
    }
  }, [props.token])

  useEffect(() => {
    const promises = []

    if (props.token) {
      promises.push(
        updateAboutMe().catch(() => {
          setIsLogged(false)
        }),
      )
    } else {
      setAboutMeLoaded(true)
    }

    Promise.all(promises).then((i) => setTimeout(() => setAllLoaded(true), 1))

  }, [])


  const updateAboutMe = async (updatedUser?: IAboutMe) => {
    let newUser: IAboutMe | null = null
    if (updatedUser) {
      newUser = updatedUser
      setAboutMe(updatedUser)
      setAboutMeLoaded(true)
    } else {
      try {
        newUser = await AuthRepository.fetchAboutMe()
        if (newUser) {
          setAboutMe(newUser)
        }

      } catch (err) {
        if (err instanceof RequestError) {
          showSnackbar(err.message, SnackbarType.error)
        }
      }
      setAboutMeLoaded(true)
    }
    return newUser
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

  const showSnackbar = (text: string, type: SnackbarType) => {
    setSnackbar({text, type})
    setTimeout(() => {
      setSnackbar(null)
    }, 2000)
  }

  const value: IState = {
    ...defaultValue,
    isMobile: isMobile,
    isDesktop: !props.isMobile,
    isLogged,
    aboutMeLoaded,
    allLoaded,
    modal,
    modalArguments,
    bottomSheet,
    snackbar,
    aboutMe,
    updateAboutMe,
    showModal,
    showBottomSheet,
    showSnackbar,
    hideModal,
    token,
    setToken: (token: string) => {
      Cookies.set(CookiesType.accessToken, token, {
        expires: CookiesLifeTime.accessToken,
      })
      setIsLogged(true)
      loginState$.next(true)

    },

    hideBottomSheet,
    logout: () => {
      Cookies.remove(CookiesType.accessToken)
      setIsLogged(false)
      setAboutMe(null)

      loginState$.next(false)
    },
    isFilesUploading,
    setIsFilesUploading: (value) => {
      setIsFilesUploading(value)
      fileUploadingState$.next(value)
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
