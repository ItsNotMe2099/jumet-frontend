import {createContext, useContext, useEffect, useState} from 'react'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {IRepresentative} from '@/data/interfaces/IRepresentative'
import RepresentativeRepository from '@/data/repositories/RepresentativeRepository'
import {ModalType, SnackbarType} from '@/types/enums'
import UserUtils from '@/utils/UserUtils'
import {
  ConfirmModalArguments,
  RepresentativeSuccessModalArguments
} from '@/types/modal_arguments'
import {IRepresentativeDeleteRegistrationRequest} from '@/data/interfaces/IRepresentativeDeleteRegistrationRequest'

interface IState {
  representativeId: Nullable<number | string>,
  representative: Nullable<IRepresentative>,
  loading: boolean
  editLoading: boolean,
  deleteLoading: boolean,
  codeResendLoading: boolean,
  update: (data: DeepPartial<IRepresentative>) => Promise<Nullable<IRepresentative>>,
  delete: () => Promise<void>,
  create: (data: DeepPartial<IRepresentative>) => Promise<Nullable<IRepresentative>>,
  register: (data: DeepPartial<IRepresentative>) => Promise<Nullable<IRepresentative>>,
  deleteRegistration: (data: IRepresentativeDeleteRegistrationRequest) => Promise<Nullable<IRepresentative>>,
  resendCode: () => Promise<void>
}

const defaultValue: IState = {
  representativeId: 0,
  representative: null,
  loading: false,
  editLoading: false,
  deleteLoading: false,
  codeResendLoading: false,
  update: async(data: DeepPartial<IRepresentative>) =>null,
  delete: async () => {},
  create: async (data: DeepPartial<IRepresentative>) => null,
  register: async (data: DeepPartial<IRepresentative>) => null,
  deleteRegistration: async (data: IRepresentativeDeleteRegistrationRequest) => null,
  resendCode: async () => {}
}

const RepresentativeContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  representativeId?: Nullable<string | number>,
  representative?: Nullable<IRepresentative>,
}

export function RepresentativeWrapper(props: Props) {
  const appContext = useAppContext()
  const [representative, setRepresentative] = useState<Nullable<IRepresentative>>(props.representative as Nullable<IRepresentative>)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [codeResendLoading, setCodeResendLoading] = useState<boolean>(false)
  useEffect(() => {
    setRepresentative(props.representative as Nullable<IRepresentative>)

  }, [props.representative])


  useEffect(() => {
    if (!props.representative && props.representativeId) {

    }
  }, [props.representativeId, props.representative])
  const handleUpdate = (entity: IRepresentative) => {
    appContext.representativeUpdateState$.next(entity)
  }

  const handleCreate = (entity: IRepresentative) => {
    appContext.representativeCreateState$.next(entity)
  }

  const handleDelete = (entity: IRepresentative) => {
    console.log('handleDelete', entity)
    appContext.representativeDeleteState$.next(entity)
  }


  const create = async (data: DeepPartial<IRepresentative>): Promise<Nullable<IRepresentative>> => {
    try {
      setEditLoading(true)
      const res = await RepresentativeRepository.create(data)
      setRepresentative(res)
      handleCreate(res)
      setEditLoading(false)
      return res
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setEditLoading(false)
      throw err
    }
  }
  const update = async (data: DeepPartial<IRepresentative>): Promise<Nullable<IRepresentative>> => {
    try {
      setEditLoading(true)
      const res = await RepresentativeRepository.update(representative?.id!, data)
      setRepresentative(res)
      handleUpdate(res)
      setEditLoading(false)
      return res
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setEditLoading(false)
      throw err
    }
  }
  const deleteRequest = async () => {
    appContext.showModal(ModalType.Confirm, {
      title: 'Удалить представителя?',
      text: `Вы уверены что хотите удалить представителя ${UserUtils.getName(representative)}?`,
      onConfirm: async () => {
        appContext.hideModal()
        try {
          setDeleteLoading(true)
          const res = await RepresentativeRepository.delete(representative?.id!)
          handleDelete(representative!)
          setDeleteLoading(false)
          return res
        } catch (err) {
          if (err instanceof RequestError) {
            appContext.showSnackbar(err.message, SnackbarType.error)
          }
          setDeleteLoading(false)
          throw err
        }
      }
    } as ConfirmModalArguments)

  }

  const register = async (data: DeepPartial<IRepresentative>): Promise<Nullable<IRepresentative>> => {
    try {
      setEditLoading(true)
      const res = await RepresentativeRepository.register(data)
      setRepresentative(res)
      setEditLoading(false)
      return res
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setEditLoading(false)
      throw err
    }
  }


  const deleteRegistration = async (data: DeepPartial<IRepresentative>): Promise<Nullable<IRepresentative>> => {
    try {
      setEditLoading(true)
      const res = await RepresentativeRepository.deleteRegistration(data)
      setRepresentative(res)
      setEditLoading(false)
      return res
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setEditLoading(false)
      throw err
    }
  }
  const resendCode = async () => {
    try {
      setCodeResendLoading(true)
      const res = await RepresentativeRepository.resendCode(representative!.id)
      setCodeResendLoading(false)

      if(res.code){
        appContext.showModal(ModalType.RepresentativeSuccess, {representative: {...representative, code: res.code}} as RepresentativeSuccessModalArguments)
      }
    } catch (err) {
      if (err instanceof RequestError) {
        appContext.showSnackbar(err.message, SnackbarType.error)
      }
      setCodeResendLoading(false)
      throw err
    }
  }
  const value: IState = {
    ...defaultValue,
    representative,
    representativeId: props.representativeId ?? null,
    editLoading,
    deleteLoading,
    codeResendLoading,
    loading,
    create,
    update,
    delete: deleteRequest,
    deleteRegistration,
    register,
    resendCode,
  }
  return (
    <RepresentativeContext.Provider value={value}>
      {props.children}
    </RepresentativeContext.Provider>
  )
}

export function useRepresentativeContext() {
  return useContext(RepresentativeContext)
}
