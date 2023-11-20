import {createContext, useContext, useEffect, useState} from 'react'
import { Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import IEmployee from '@/data/interfaces/IEmployee'
import EmployeeRepository from '@/data/repositories/EmployeeRepository'
import {ModalType, SnackbarType} from '@/types/enums'
import UserUtils from '@/utils/UserUtils'
import {
  ConfirmModalArguments,
} from '@/types/modal_arguments'
import {IEmployeeCreateRequest} from '@/data/interfaces/IEmployeeCreateRequest'

interface IState {
  employeeId: Nullable<number | string>,
  employee: Nullable<IEmployee>,
  loading: boolean
  editLoading: boolean,
  deleteLoading: boolean,
  update: (data: IEmployeeCreateRequest) => Promise<Nullable<IEmployee>>,
  delete: () => Promise<void>,
  create: (data: IEmployeeCreateRequest) => Promise<Nullable<IEmployee>>,
}

const defaultValue: IState = {
  employeeId: 0,
  employee: null,
  loading: false,
  editLoading: false,
  deleteLoading: false,
  update: async(data: IEmployeeCreateRequest) =>null,
  delete: async () => {},
  create: async (data: IEmployeeCreateRequest) => null,
}

const EmployeeOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  employeeId?: Nullable<string | number> | undefined,
  employee?: Nullable<IEmployee> | undefined,
}

export function EmployeeOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [employee, setEmployee] = useState<Nullable<IEmployee>>(props.employee as Nullable<IEmployee>)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [codeResendLoading, setCodeResendLoading] = useState<boolean>(false)
  useEffect(() => {
    setEmployee(props.employee as Nullable<IEmployee>)

  }, [props.employee])


  useEffect(() => {
    if (!props.employee && props.employeeId) {

    }
  }, [props.employeeId, props.employee])
  const handleUpdate = (entity: IEmployee) => {
    appContext.employeeUpdateState$.next(entity)
  }

  const handleCreate = (entity: IEmployee) => {
    appContext.employeeCreateState$.next(entity)
  }

  const handleDelete = (entity: IEmployee) => {
    appContext.employeeDeleteState$.next(entity)
  }


  const create = async (data: IEmployeeCreateRequest): Promise<Nullable<IEmployee>> => {
    try {
      setEditLoading(true)
      const res = await EmployeeRepository.create(data)
      setEmployee(res)
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
  const update = async (data: IEmployeeCreateRequest): Promise<Nullable<IEmployee>> => {
    try {
      setEditLoading(true)
      const res = await EmployeeRepository.update(employee?.id!, data)
      setEmployee(res)
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
      title: 'Удалить сотрудника?',
      text: `Вы уверены что хотите удалить сотрудника ${UserUtils.getName(employee)}?`,
      onConfirm: async () => {
        appContext.hideModal()
        try {
          setDeleteLoading(true)
          const res = await EmployeeRepository.delete(employee?.id!)
          handleDelete(employee!)
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

  const value: IState = {
    ...defaultValue,
    employee,
    employeeId: props.employeeId ?? null,
    editLoading,
    deleteLoading,
    loading,
    create,
    update,
    delete: deleteRequest,
  }
  return (
    <EmployeeOwnerContext.Provider value={value}>
      {props.children}
    </EmployeeOwnerContext.Provider>
  )
}

export function useEmployeeOwnerContext() {
  return useContext(EmployeeOwnerContext)
}
