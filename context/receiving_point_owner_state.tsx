import {createContext, useContext, useEffect, useState} from 'react'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointOwnerRepository from '@/data/repositories/ReceivingPointOwnerRepository'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments} from '@/types/modal_arguments'
import {ReceivingPointStatus} from '@/data/enum/ReceivingPointStatus'

interface IState {
  receivingPointId: number,
  receivingPoint: Nullable<IReceivingPoint>,
  deleteLoading: boolean,
  publishLoading: boolean,
  loading: boolean
  editLoading: boolean,
  fetch: () => Promise<Nullable<IReceivingPoint>>
  delete: () => Promise<Nullable<IReceivingPoint>>,
  publish: () => Promise<Nullable<IReceivingPoint>>,
  unPublish: () => Promise<Nullable<IReceivingPoint>>
  edit: () => void,
  editRequest: (data: DeepPartial<IReceivingPoint>) => Promise<Nullable<IReceivingPoint>>,
}

const defaultValue: IState = {
  receivingPointId: 0,
  receivingPoint: null,
  deleteLoading: false,
  publishLoading: false,
  loading: false,
  editLoading: false,
  fetch: async () => null,
  delete: async () => null,
  publish: async () => null,
  unPublish: async () => null,
  edit: () => null,
  editRequest: async (data) => null
}

const ReceivingPointOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  receivingPointId: number,
  receivingPoint?: Nullable<IReceivingPoint>,
}

export function ReceivingPointOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [items, setItems] = useState<IReceivingPoint[]>([])
  const [receivingPoint, setReceivingPoint] = useState<Nullable<IReceivingPoint>>(props.receivingPoint as Nullable<IReceivingPoint>)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [publishLoading, setPublishLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setReceivingPoint(props.receivingPoint as Nullable<IReceivingPoint>)

  }, [props.receivingPoint])
  const fetch = async (): Promise<Nullable<IReceivingPoint>> => {
    const res = await ReceivingPointOwnerRepository.fetchById(props.receivingPointId)
    setReceivingPoint(res)
    return res
  }
  useEffect(() => {
    if (!props.receivingPoint && props.receivingPointId) {
      setLoading(true)
      fetch().then((i) => setLoading(false))
    }
  }, [props.receivingPointId, props.receivingPoint])
  const handleUpdate = (entity: IReceivingPoint) => {
    appContext.receivingPointUpdateState$.next(entity)
  }
  const handleDelete = (entity: IReceivingPoint) => {
    appContext.receivingPointDeleteState$.next(entity)
  }
  const publish = async (): Promise<Nullable<IReceivingPoint>> => {
    try {
      setPublishLoading(true)
      const res = await ReceivingPointOwnerRepository.update(props.receivingPointId, {status: ReceivingPointStatus.Published} as any)
      handleUpdate(res)
      setReceivingPoint(i => ({...i, published: true} as any))
      setPublishLoading(false)
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setPublishLoading(false)
    }
    return null
  }

  const unPublish = async (): Promise<Nullable<IReceivingPoint>> => {
    return new Promise<Nullable<IReceivingPoint>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Вы уверены что хотите снять с публикации пункт приема «${receivingPoint?.name}» ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setPublishLoading(true)
            const res = await ReceivingPointOwnerRepository.update(props.receivingPointId, {status: ReceivingPointStatus.Published} as any)
            setReceivingPoint(i => ({...i, published: false} as any))
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

  const editRequest = async (data: DeepPartial<IReceivingPoint>): Promise<Nullable<IReceivingPoint>> => {
    try {
      setEditLoading(true)
      const res = await ReceivingPointOwnerRepository.update(props.receivingPointId, data)
      setReceivingPoint(i => ({...i, ...res}))
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }

  const deleteRequest = async (): Promise<Nullable<IReceivingPoint>> => {
    return new Promise<Nullable<IReceivingPoint>>((resolve, reject) => {
      appContext.showModal(ModalType.Confirm, {
        text: `Вы уверены что хотите удалить пункт приема «${receivingPoint?.name}» ?`,
        onConfirm: async () => {
          try {
            appContext.hideModal()
            setDeleteLoading(true)
            const res = await ReceivingPointOwnerRepository.delete(props.receivingPointId)
            handleDelete(receivingPoint!)
            resolve(receivingPoint)
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
    receivingPoint,
    receivingPointId: props.receivingPointId,
    publishLoading,
    editLoading,
    loading,
    deleteLoading,
    fetch,
    editRequest,
    delete: deleteRequest,
    publish,
    unPublish,
  }
  return (
    <ReceivingPointOwnerContext.Provider value={value}>
      {props.children}
    </ReceivingPointOwnerContext.Provider>
  )
}

export function useReceivingPointOwnerContext() {
  return useContext(ReceivingPointOwnerContext)
}
