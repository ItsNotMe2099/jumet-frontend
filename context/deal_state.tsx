import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IDeal} from '@/data/interfaces/IDeal'
import DealRepository from '@/data/repositories/DealRepository'
import {Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments, DealTerminateFormModalArguments} from '@/types/modal_arguments'
import {
  IDealPayStepRequest,
  IDealSetUpStepRequest,
  IDealTermByBuyerStepRequest,
  IDealTermBySellerStepRequest, IDealWeighingStepRequest
} from '@/data/interfaces/IDealStepRequest'
import useWindowFocus from 'use-window-focus'
import {useNetworkStatus} from 'use-network-status'
import useInterval from 'use-interval'
import {Timers} from '@/types/constants'
import {IDealCalculateRequest} from '@/data/interfaces/IDealCalculateRequest'
import {IDealCalculateResult} from '@/data/interfaces/IDealCalculateResult'
import {CanceledError} from 'axios'

interface IState {
  dealId: number,
  deal: Nullable<IDeal>,
  terminateLoading: boolean,
  loading: boolean
  editLoading: boolean,
  calculateLoading: boolean
  isCalculateManual: boolean
  calculationData: Nullable<IDealCalculateResult>
  fetch: () => Promise<Nullable<IDeal>>
  submitStepSetup: (data: IDealSetUpStepRequest) => Promise<Nullable<IDeal>>
  submitStepWeighing: (data: IDealWeighingStepRequest) => Promise<Nullable<IDeal>>
  submitStepWeighingAccept: () => Promise<Nullable<IDeal>>
  submitStepPay: (data: IDealPayStepRequest) => Promise<Nullable<IDeal>>
  terminateBySeller: () => Promise<Nullable<IDeal>>
  terminateBySellerRequest: (data: IDealTermBySellerStepRequest) => Promise<Nullable<IDeal>>
  terminateByBuyer: () => void
  terminateByBuyerRequest: (data: IDealTermByBuyerStepRequest) => Promise<Nullable<IDeal>>
  calculate: (data: IDealCalculateRequest) => Promise<Nullable<IDealCalculateResult>>,
  calculateClear: () => void,
  setCalculateIsManual: (value: boolean) => void

}

const defaultValue: IState = {
  dealId: 0,
  deal: null,
  terminateLoading: false,
  loading: false,
  editLoading: false,
  calculateLoading: false,
  calculationData: null,
  isCalculateManual: false,
  fetch: async () => null,
  submitStepSetup: async (data: IDealSetUpStepRequest) => null,
  submitStepWeighing: async (data: IDealWeighingStepRequest) => null,
  submitStepWeighingAccept: async () => null,
  submitStepPay: async (data: IDealPayStepRequest) => null,
  terminateBySeller: async () => null,
  terminateBySellerRequest: async (data: IDealTermBySellerStepRequest) => null,
  terminateByBuyer: () => null,
  terminateByBuyerRequest: async (data: IDealTermByBuyerStepRequest) => null,
  calculate: async (data: IDealCalculateRequest) => null,
  calculateClear: () => null,
  setCalculateIsManual: (value: boolean) => null
}

const DealContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  dealId: number,
  deal?: Nullable<IDeal>,
}

export function DealWrapper(props: Props) {
  const appContext = useAppContext()
  const [deal, setDeal] = useState<Nullable<IDeal>>(props.deal as Nullable<IDeal>)
  const [terminateLoading, setTerminateLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const windowFocused = useWindowFocus()
  const isOnline = useNetworkStatus()
  const initWindowFocusedRef = useRef<boolean>(false)
  const dealIdRef = useRef<number>(props.dealId)
  const fetchAbortControllerRef = useRef<AbortController | null>(null)
  const calculateAbortControllerRef = useRef<AbortController | null>(null)
  const [calculationData, setCalculationData] = useState<Nullable<IDealCalculateResult>>(null)
  const [isCalculateManual, setIsCalculateManual] = useState(false)
  const [calculateLoading, setCalculateLoading] = useState(false)
  useEffect(() => {
    dealIdRef.current = props.dealId
  }, [props.dealId])
  useEffect(() => {
    setDeal(props.deal as Nullable<IDeal>)
  }, [props.deal])
  useInterval(() => {
    fetch()
  }, Timers.dealRefresh)
  useEffect(() => {
    if (!initWindowFocusedRef.current) {
      initWindowFocusedRef.current = true
      return
    }
    if (windowFocused || isOnline) {
      fetch()
    }

  }, [windowFocused, isOnline])
  useEffect(() => {
    const subscriptionUpdateDeal = appContext.dealUpdateState$.subscribe((newDeal) => {
      if (deal && newDeal.id === deal?.id) {
        setDeal(i => ({...i, ...newDeal} as IDeal))
      }
    })
    const subscriptionCreate = appContext.reviewCreateState$.subscribe((review) => {
      if (deal && review.dealId === deal?.id) {
        setDeal(i => ({...i, review: {...(i?.review ? i.review : {}), ...review}} as IDeal))
      }
    })
    const subscriptionUpdate = appContext.reviewUpdateState$.subscribe((review) => {
      if (deal && review.dealId === deal?.id) {
        setDeal(i => ({...i, review: {...(i?.review ? i.review : {}), ...review}} as IDeal))
      }
    })
    return () => {
      subscriptionUpdateDeal.unsubscribe()
      subscriptionUpdate.unsubscribe()
      subscriptionCreate.unsubscribe()
    }
  }, [deal])
  const stopAbort = () => {
    try {
      if (fetchAbortControllerRef.current) {
        fetchAbortControllerRef.current?.abort()
        fetchAbortControllerRef.current = null
      }
    } catch (e) {

    }
  }
  const fetch = async (): Promise<Nullable<IDeal>> => {
    stopAbort()
    fetchAbortControllerRef.current = new AbortController()
    try {
      const res = await DealRepository.fetchById(dealIdRef.current, {signal: fetchAbortControllerRef.current?.signal!})
      setDeal(res)
      return res
    } catch (e) {
      if (fetchAbortControllerRef.current?.signal?.aborted) {
        return null
      }
    }
    return null
  }
  useEffect(() => {
    if (!props.deal && props.dealId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.dealId, props.deal])
  const handleUpdate = (entity: IDeal) => {
    appContext.dealUpdateState$.next(entity)
  }


  const submitStepSetup = async (data: IDealSetUpStepRequest): Promise<Nullable<IDeal>> => {
    try {
      stopAbort()
      setEditLoading(true)
      const res = await DealRepository.setUp(props.dealId, data)
      handleUpdate(res)
      setDeal((i) => ({...i, ...res} as any))
      setEditLoading(false)
      return {...deal, ...res}
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    return null
  }

  const submitStepWeighing = async (data: IDealWeighingStepRequest): Promise<Nullable<IDeal>> => {
    try {
      stopAbort()
      setEditLoading(true)
      const res = await DealRepository.weighing(props.dealId, data)
      handleUpdate(res)
      setDeal((i) => ({...i, ...res} as any))
      setEditLoading(false)
      return {...deal, ...res}
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    return null
  }
  const submitStepWeighingAccept = async (): Promise<Nullable<IDeal>> => {
    try {
      stopAbort()
      setEditLoading(true)
      const res = await DealRepository.weighingAccept(props.dealId)
      handleUpdate(res)
      setDeal((i) => ({...i, ...res} as any))
      setEditLoading(false)
      return {...deal, ...res}
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    return null
  }
  const submitStepPay = async (data: IDealPayStepRequest): Promise<Nullable<IDeal>> => {
    try {
      stopAbort()
      setEditLoading(true)
      const res = await DealRepository.pay(props.dealId, data)
      handleUpdate(res)
      setDeal((i) => ({...i, ...res} as any))
      setEditLoading(false)
      return {...deal, ...res}
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    return null
  }
  const terminateBySeller = async (): Promise<Nullable<IDeal>> => {
    return new Promise<Nullable<IDeal>>((resolve, reject) => {

      appContext.showModal(ModalType.Confirm, {
        title: 'Вы не согласны с результатами взвешивания?',
        text: 'В случае отказа подтвердить результаты взвешивания, нужно будет лично посетить пункт приёма для повторного взвешивания или отменить сделку и забрать лом',
        confirmColor: 'red',
        onConfirm: async () => {
          try {
            stopAbort()
            setTerminateLoading(true)
            appContext.hideModal()
            const res = await terminateBySellerRequest({})
            resolve(res)
            return res
          } catch (err) {
            if (err instanceof RequestError) {
              appContext.showSnackbar(err.message, SnackbarType.error)
            }
            resolve(null)
            setTerminateLoading(false)
          }
        }
      } as ConfirmModalArguments)
    })
  }
  const terminateByBuyer = async () => {
    appContext.showModal(ModalType.DealTerminateForm, {deal} as DealTerminateFormModalArguments)
  }
  const terminateByBuyerRequest = async (data: IDealTermByBuyerStepRequest): Promise<Nullable<IDeal>> => {
    try {
      stopAbort()
      setTerminateLoading(true)
      const res = await DealRepository.terminateByBuyer(props.dealId, data)
      handleUpdate(res)
      console.log('Res111', res)
      setDeal((i) => ({...i, ...res} as any))
      setTerminateLoading(false)
      return {...deal, ...res}
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    return null
  }
  const terminateBySellerRequest = async (data: IDealTermBySellerStepRequest): Promise<Nullable<IDeal>> => {
    stopAbort()
    setTerminateLoading(true)
    const res = await DealRepository.terminateBySeller(props.dealId)
    handleUpdate(res)
    setDeal((i) => ({...i, ...res} as any))
    setTerminateLoading(false)
    return {...deal, ...res}
  }
  const calculate = async (data: IDealCalculateRequest): Promise<Nullable<IDealCalculateResult>> => {
    if(!data.actualWeight){
      setCalculationData(null)
      return null
    }
    if(isCalculateManual){
      return calculateManual(data)
    }
    try {
      if (calculateAbortControllerRef.current) {
        calculateAbortControllerRef.current?.abort()
        calculateAbortControllerRef.current = null
      }
      setCalculateLoading(true)
      const res = await DealRepository.calculate(props.dealId, data, {signal: fetchAbortControllerRef.current?.signal!})
      setCalculationData(res)
      setCalculateLoading(false)
      return res
    } catch (e) {
      if (e instanceof CanceledError) {
        return null
      }
      throw e
    }

    setCalculateLoading(false)
    return null
  }
  const calculateManual = (dto: IDealCalculateRequest): Nullable<IDealCalculateResult> => {
    if(!dto.price || !dto.actualWeight){
      setCalculationData(null)
      return null
    }
    const actualWeightWithoutRubbish =
      (dto.actualWeight *
        ((100 -
            (dto.actualRubbishInPercents ? dto.actualRubbishInPercents : 0)) /
          100)) /
      1000

    const deliveryPrice = deal!.requiresDelivery
      ? dto.deliveryPrice ?? 0
      : 0
    const loadingPrice = deal!.requiresLoading
      ? dto.loadingPrice ?? 0
      : 0
    const totalDelivery = (dto.actualWeight / 1000) * deliveryPrice
    const totalLoading = (dto.actualWeight / 1000) * loadingPrice
    const price =
      dto.price ?? 0
    const subTotal = actualWeightWithoutRubbish * price
    const total = subTotal - totalLoading - totalDelivery
    const res: IDealCalculateResult = {
      total: total < 0 ? 0 : total,
      subTotal: subTotal < 0 ? 0 : subTotal,
      price,
      loadingPrice,
      deliveryPrice,
      totalDelivery,
      totalLoading,
    }
    setCalculationData( res)
    return res
  }
  const value: IState = {
    ...defaultValue,
    deal,
    dealId: props.dealId,
    terminateLoading,
    editLoading,
    loading,
    calculationData,
    calculateLoading,
    isCalculateManual,
    fetch,
    calculate,
    submitStepSetup,
    submitStepWeighing,
    submitStepWeighingAccept,
    submitStepPay,
    terminateBySeller,
    terminateBySellerRequest,
    terminateByBuyer,
    terminateByBuyerRequest,
    setCalculateIsManual: (value) => {
      setCalculationData(null)
      setIsCalculateManual(value)
    }
  }
  return (
    <DealContext.Provider value={value}>
      {props.children}
    </DealContext.Provider>
  )
}

export function useDealContext() {
  return useContext(DealContext)
}
