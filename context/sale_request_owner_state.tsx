import {createContext, useContext, useEffect, useState} from 'react'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import SaleRequestOwnerRepository from '@/data/repositories/SaleRequestOwnerRepository'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments, SaleRequestFormModalArguments} from '@/types/modal_arguments'
import {SaleRequestStatus} from '@/data/enum/SaleRequestStatus'
import Formatter from '@/utils/formatter'

interface IState {
  saleRequestId: number,
  saleRequest: Nullable<ISaleRequest>,
  deleteLoading: boolean,
  publishLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<ISaleRequest>>
  delete: () => Promise<Nullable<ISaleRequest>>,
  publish: () => Promise<Nullable<ISaleRequest>>,
  unPublish: () => Promise<Nullable<ISaleRequest>>
  edit: () => void,
  editRequest: (data: DeepPartial<ISaleRequest>) => Promise<Nullable<ISaleRequest>>,
  accept: () => Promise<Nullable<ISaleRequest>>,
  reject: () => Promise<Nullable<ISaleRequest>>,
  acceptLoading: boolean,
  rejectLoading: boolean,
}

const defaultValue: IState = {
  saleRequestId: 0,
  saleRequest: null,
  deleteLoading: false,
  publishLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  publish: async () => null,
  unPublish: async () => null,
  edit: () => null,
  editRequest: async (data) => null,
  accept: async () => null,
  reject: async () => null,
  acceptLoading: false,
  rejectLoading: false,
}

const SaleRequestOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  saleRequestId: number,
  saleRequest?: Nullable<ISaleRequest>,
}

export function SaleRequestOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [saleRequest, setSaleRequest] = useState<Nullable<ISaleRequest>>(props.saleRequest as Nullable<ISaleRequest>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [publishLoading, setPublishLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(!props.saleRequest && !!props.saleRequestId)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [acceptLoading, setAcceptLoading] = useState<boolean>(false)
  const [rejectLoading, setRejectLoading] = useState<boolean>(false)

  useEffect(() => {
    setSaleRequest(props.saleRequest as Nullable<ISaleRequest>)
  }, [props.saleRequest])
  useEffect(() => {
    const subscription = appContext.saleRequestUpdateState$.subscribe((newSaleRequest) => {
      console.log('UpdateNEw', newSaleRequest)
      if(newSaleRequest.id === (props.saleRequestId ?? saleRequest?.id)){
        setSaleRequest(i => ({...i, ...newSaleRequest}))
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [saleRequest])
  const fetch = async (): Promise<Nullable<ISaleRequest>> => {
    const res = await SaleRequestOwnerRepository.fetchById(props.saleRequestId)
    setSaleRequest(res)
    return res
  }
  useEffect(() => {
    if(!props.saleRequest && props.saleRequestId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.saleRequestId, props.saleRequest])
  const handleUpdate = (entity: ISaleRequest) => {
    appContext.saleRequestUpdateState$.next(entity)
  }
  const handleDelete = (entity: ISaleRequest) => {
    appContext.saleRequestDeleteState$.next(entity)
  }
  const publish = async (): Promise<Nullable<ISaleRequest>> => {
    return new Promise<Nullable<ISaleRequest>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        confirmColor: 'blue',
        title: 'Восстановить прием предложений?',
        confirm: 'Восстановить',
        text: `Вы уверены что хотите возобновить прием предложений по заявке № ${saleRequest?.id}?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setPublishLoading(true)
            const res = await SaleRequestOwnerRepository.update(props.saleRequestId, {status: SaleRequestStatus.Published} as any)
            handleUpdate(res)
            setSaleRequest(i => ({...i, status: SaleRequestStatus.Published} as any))
            setPublishLoading(false)
            resolve(res)
          } catch (err) {
            if (err instanceof RequestError) {
              appContext.showSnackbar(err.message, SnackbarType.error)
            }
            setPublishLoading(false)
            resolve(null)
          }
        }
      } as ConfirmModalArguments)

    })
  }

  const unPublish = async (): Promise<Nullable<ISaleRequest>> => {
    return new Promise<Nullable<ISaleRequest>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        confirmColor: 'red',
        title: 'Остановить прием предложений?',
        text: `Вы уверены что хотите остановить прием предложений по заявке № ${saleRequest?.id}?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setPublishLoading(true)
            const res = await SaleRequestOwnerRepository.update(props.saleRequestId, {status: SaleRequestStatus.Draft} as any)
            setSaleRequest(i => ({...i, status: SaleRequestStatus.Draft} as any))
            setPublishLoading(false)
            handleUpdate(res)
            resolve(res)

            return res
          } catch (err) {
            if (err instanceof RequestError) {
              appContext.showSnackbar(err.message, SnackbarType.error)
            }
            resolve(null)
            setPublishLoading(false)
          }
        }
      } as ConfirmModalArguments)
    })
  }

  const editRequest = async (data: DeepPartial<ISaleRequest>): Promise<Nullable<ISaleRequest>> => {
    try {
      setEditLoading(true)
      const res = await SaleRequestOwnerRepository.update(props.saleRequestId, data)
      handleUpdate(res)
      setSaleRequest(i => ({...i, ...res}))
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }

  const deleteRequest = async (): Promise<Nullable<ISaleRequest>> => {
    return new Promise<Nullable<ISaleRequest>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Вы уверены что хотите удалить заявку № ${saleRequest?.id} ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await SaleRequestOwnerRepository.delete(props.saleRequestId)
            handleDelete(saleRequest!)
            resolve(saleRequest)
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

  const accept = async (): Promise<Nullable<ISaleRequest>> => {
    return new Promise<Nullable<ISaleRequest>>((resolve, reject) => {

      appContext.showModal(ModalType.Confirm, {
        title: 'Принять предложение',
        text: `Вы уверены что хотите принять предложение № ${saleRequest?.id} от ${Formatter.formatDateRelative(saleRequest!.createdAt!)}?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setAcceptLoading(true)
            const res = await SaleRequestOwnerRepository.updateByBuyer(props.saleRequestId, {status: SaleRequestStatus.Accepted} as any)
            handleUpdate(res)
            setSaleRequest(i => ({...i, status: SaleRequestStatus.Accepted} as any))
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

  const reject = async (): Promise<Nullable<ISaleRequest>> => {
    return new Promise<Nullable<ISaleRequest>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        title: 'Отклонить предложение',
        text: `Вы уверены что хотите отклонить предложение по заявке № ${saleRequest?.id} от ${Formatter.formatDateRelative(saleRequest!.createdAt!)} ?`,
        confirmColor: 'red',
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setRejectLoading(true)
            const res = await SaleRequestOwnerRepository.updateByBuyer(props.saleRequestId, {status: SaleRequestStatus.Rejected} as any)
            setSaleRequest(i => ({...i, status: SaleRequestStatus.Rejected} as any))
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
  const value: IState = {
    ...defaultValue,
    saleRequest,
    saleRequestId: props.saleRequestId,
    publishLoading,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    edit: () => {
      appContext.showModal(ModalType.SaleRequestForm, {saleRequest} as SaleRequestFormModalArguments)
    },
    editRequest,
    delete: deleteRequest,
    publish,
    unPublish,
    accept,
    reject,
    acceptLoading,
    rejectLoading,
  }
  return (
    <SaleRequestOwnerContext.Provider value={value}>
      {props.children}
    </SaleRequestOwnerContext.Provider>
  )
}

export function useSaleRequestOwnerContext() {
  return useContext(SaleRequestOwnerContext)
}
