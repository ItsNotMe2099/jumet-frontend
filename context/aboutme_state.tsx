import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {DeepPartial, Nullable, RequestError} from '@/types/types'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {
  ConfirmModalArguments
} from '@/types/modal_arguments'
import IAboutMe from '@/data/interfaces/IAboutMe'
import CurrentUserRepository from '@/data/repositories/CurrentUserRepository'

interface IState {
  loading: boolean
  editLoading: boolean,
  deleteLoading: boolean,
  update: (data: DeepPartial<IAboutMe>) => Promise<Nullable<IAboutMe>>,
  deletePassportData: () => Promise<void>
}

const defaultValue: IState = {
  loading: false,
  editLoading: false,
  deleteLoading: false,
  update: async(data: DeepPartial<IAboutMe>) =>null,
  deletePassportData: async () => {},
 }

const AboutMeContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function AboutMeWrapper(props: Props) {
  const appContext = useAppContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const aboutMeRef = useRef<IAboutMe | null>()
  useEffect(() => {
    aboutMeRef.current = appContext.aboutMe
  }, [appContext.aboutMe])
  const handleUpdate = (entity: IAboutMe) => {
    appContext.updateAboutMe(entity)

  }

  const update = async (data: DeepPartial<IAboutMe>): Promise<Nullable<IAboutMe>> => {
    try {
      setEditLoading(true)
      const res = await CurrentUserRepository.update(data)
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
  const deletePassportData = async () => {
    appContext.showModal(ModalType.Confirm, {
      title: 'Удалить паспортные даные?',
      text: 'Вы уверены что хотите удалить паспортные данные и отозвать согласие на обработку персональных данных?',
      onConfirm: async () => {
        appContext.hideModal()
        try {
          setDeleteLoading(true)
          const res = await CurrentUserRepository.deletePassportData()
          handleUpdate({...aboutMeRef.current!, passport: null, isConfirmedPi: false})
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
    editLoading,
    deleteLoading,
    loading,
    update,
    deletePassportData,
  }
  return (
    <AboutMeContext.Provider value={value}>
      {props.children}
    </AboutMeContext.Provider>
  )
}

export function useAboutMeContext() {
  return useContext(AboutMeContext)
}
