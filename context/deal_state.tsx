import {createContext, useContext, useEffect, useState} from 'react'
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

interface IState {
  dealId: number,
  deal: Nullable<IDeal>,
  terminateLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<IDeal>>
  submitStepSetup: (data: IDealSetUpStepRequest) => Promise<Nullable<IDeal>>
  submitStepWeighing: (data: IDealWeighingStepRequest) => Promise<Nullable<IDeal>>
  submitStepWeighingAccept: () => Promise<Nullable<IDeal>>
  submitStepPay: (data: IDealPayStepRequest) => Promise<Nullable<IDeal>>
  terminateBySeller: () => Promise<Nullable<IDeal>>
  terminateBySellerRequest: (data: IDealTermBySellerStepRequest) => Promise<Nullable<IDeal>>
  terminateByBuyer: () => void
  terminateByBuyerRequest: (data: IDealTermByBuyerStepRequest) => Promise<Nullable<IDeal>>

}

const defaultValue: IState = {
  dealId: 0,
  deal: null,
  terminateLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  submitStepSetup: async (data: IDealSetUpStepRequest) => null,
  submitStepWeighing: async (data: IDealWeighingStepRequest) => null,
  submitStepWeighingAccept: async () => null,
  submitStepPay: async (data: IDealPayStepRequest) => null,
  terminateBySeller: async () => null,
  terminateBySellerRequest: async (data: IDealTermBySellerStepRequest) => null,
  terminateByBuyer: () => null,
  terminateByBuyerRequest: async (data: IDealTermByBuyerStepRequest) => null,
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
  useEffect(() => {
    setDeal(props.deal as Nullable<IDeal>)

  }, [props.deal])
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
  const fetch = async (): Promise<Nullable<IDeal>> => {
    const res = await DealRepository.fetchById(props.dealId)
    setDeal(res)
    return res
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
      setTerminateLoading(true)
      const res = await DealRepository.terminateByBuyer(props.dealId, data)
      handleUpdate(res)
      console.log('Res111', res)
      setDeal((i) => ({...i, ...res} as any))
      setTerminateLoading(false)
      return {...deal, ...res}
    }catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
    }
    return  null
  }
  const terminateBySellerRequest = async (data: IDealTermBySellerStepRequest): Promise<Nullable<IDeal>> => {
    setTerminateLoading(true)
    const res = await DealRepository.terminateBySeller(props.dealId)
    handleUpdate(res)
    setDeal((i) => ({...i, ...res} as any))
    setTerminateLoading(false)
    return {...deal, ...res}
  }


  const value: IState = {
    ...defaultValue,
    deal,
    dealId: props.dealId,
    terminateLoading,
    editLoading,
    loading,
    fetch,
    submitStepSetup,
    submitStepWeighing,
    submitStepWeighingAccept,
    submitStepPay,
    terminateBySeller,
    terminateBySellerRequest,
    terminateByBuyer,
    terminateByBuyerRequest,
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
