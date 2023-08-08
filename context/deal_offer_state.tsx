import {createContext, useContext, useEffect, useState} from 'react'
import {IDealOffer} from '@/data/interfaces/IDealOffer'
import DealOfferRepository from '@/data/repositories/DealOfferRepository'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import {DealOfferStatus} from '@/data/enum/DealOfferStatus'
import Formatter from '@/utils/formatter'

interface IState {
  dealOfferId: number,
  dealOffer: Nullable<IDealOffer>,
  deleteLoading: boolean,
  acceptLoading: boolean,
  rejectLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<IDealOffer>>
  delete: () => Promise<Nullable<IDealOffer>>,
  accept: () => Promise<Nullable<IDealOffer>>,
  reject: () => Promise<Nullable<IDealOffer>>
  edit: () => void,
  editRequest: (data: DeepPartial<IDealOffer>) => Promise<Nullable<IDealOffer>>,
}

const defaultValue: IState = {
  dealOfferId: 0,
  dealOffer: null,
  deleteLoading: false,
  acceptLoading: false,
  rejectLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  accept: async () => null,
  reject: async () => null,
  edit: () => null,
  editRequest: async (data) => null
}

const DealOfferContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  dealOfferId: number,
  dealOffer?: Nullable<IDealOffer>,
}

export function DealOfferWrapper(props: Props) {
  const appContext = useAppContext()
  const [items, setItems] = useState<IDealOffer[]>([])
  const [dealOffer, setDealOffer] = useState<Nullable<IDealOffer>>(props.dealOffer as Nullable<IDealOffer>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false)
  const [rejectLoading, setRejectLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setDealOffer(props.dealOffer as Nullable<IDealOffer>)

  }, [props.dealOffer])
  const fetch = async (): Promise<Nullable<IDealOffer>> => {
    const res = await DealOfferRepository.fetchById(props.dealOfferId)
    setDealOffer(res)
    return res
  }
  useEffect(() => {
    setLoading(true)
    fetch().then((i) => setLoading(false))
  }, [props.dealOfferId])
  const handleUpdate = (entity: IDealOffer) => {
    appContext.dealOfferUpdateState$.next(entity)
  }
  const handleDelete = (entity: IDealOffer) => {
    appContext.dealOfferDeleteState$.next(entity)
  }
  const accept = async (): Promise<Nullable<IDealOffer>> => {
    return new Promise<Nullable<IDealOffer>>((resolve, reject) => {

      appContext.showModal(ModalType.Confirm, {
        title: 'Принять предложение',
        text: `Вы уверены что хотите принять предложение от ${dealOffer?.receivingPoint?.name} от ${Formatter.formatDateRelative(dealOffer!.createdAt!)} ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setAcceptLoading(true)
            const res = await DealOfferRepository.update(props.dealOfferId, {status: DealOfferStatus.Accepted} as any)
            handleUpdate(res)
            setDealOffer(i => ({...i, status: DealOfferStatus.Accepted} as any))
            setAcceptLoading(false)
            resolve(res)
            return res
          } catch (err) {
            if (err instanceof RequestError) {
              appContext.showSnackbar(err.message, SnackbarType.error)
            }
            resolve(null)
            setAcceptLoading(false)
          }
        }
      } as ConfirmModalArguments)
    })
  }

  const reject = async (): Promise<Nullable<IDealOffer>> => {
    return new Promise<Nullable<IDealOffer>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        title: 'Отклонить предложение',
        text: `Вы уверены что хотите отклонить предложение по заявке № ${dealOffer?.id} ?`,
        confirmColor: 'red',
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setRejectLoading(true)
            const res = await DealOfferRepository.update(props.dealOfferId, {status: DealOfferStatus.Rejected} as any)
            setDealOffer(i => ({...i, status: DealOfferStatus.Rejected} as any))
            setRejectLoading(false)
            handleUpdate(res)
            resolve(res)

            return res
          } catch (err) {
            if (err instanceof RequestError) {
              appContext.showSnackbar(err.message, SnackbarType.error)
            }
            resolve(null)
            setRejectLoading(false)
          }
        }
      } as ConfirmModalArguments)
    })
  }

  const editRequest = async (data: DeepPartial<IDealOffer>): Promise<Nullable<IDealOffer>> => {
    try {
      setEditLoading(true)
      const res = await DealOfferRepository.update(props.dealOfferId, data)
      setDealOffer(i => ({...i, ...res}))
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }

  const deleteRequest = async (): Promise<Nullable<IDealOffer>> => {
    return new Promise<Nullable<IDealOffer>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Вы уверены что хотите удалить заявку № ${dealOffer?.id} ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)

            resolve(dealOffer)
          } catch (err) {
            if (err instanceof RequestError) {
              appContext.showSnackbar(err.message, SnackbarType.error)
            }
            resolve(null)
          }
          setDeleteLoading(false)
        }
      } as ConfirmModalArguments)
    })

  }
  const value: IState = {
    ...defaultValue,
    dealOffer,
    dealOfferId: props.dealOfferId,
    acceptLoading,
    rejectLoading,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    editRequest,
    delete: deleteRequest,
    accept,
    reject,
  }
  return (
    <DealOfferContext.Provider value={value}>
      {props.children}
    </DealOfferContext.Provider>
  )
}

export function useDealOfferContext() {
  return useContext(DealOfferContext)
}
