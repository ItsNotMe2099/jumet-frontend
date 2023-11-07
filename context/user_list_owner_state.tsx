import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IPagination} from 'types/types'
import {useAppContext} from '@/context/state'
import {IReceivingPointUserListRequest} from '@/data/interfaces/IReceivingPointUserListRequest'
import ReceivingPointUserRepository from '@/data/repositories/ReceivingPointUserRepository'
import {IReceivingPointUser} from '@/data/interfaces/IReceivingPointUser'

export interface IReceivingPointUserFilter extends IReceivingPointUserListRequest {
}

interface IState {
  data: IPagination<IReceivingPointUser>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IReceivingPointUserFilter
  setFilter: (data: IReceivingPointUserFilter) => void
  reFetch: () => void
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: IReceivingPointUserFilter) => null,
  reFetch: () => null,
  fetchMore: () => null
}

const UserListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
  receivingPointId?: number
}

export function UserListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IReceivingPointUser>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IReceivingPointUserFilter>({page: 1, limit: 10})
  const filterRef = useRef<IReceivingPointUserFilter>(filter)
  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscriptionDelete = appContext.receivingPointUserDeleteState$.subscribe((user) => {
      if(data.data.find(i => i.id === user.id))
      setData(i => ({ ...i, data: i.data.filter(i => i.id !== user.id), total: i.total - 1 }))
    })
    const subscriptionUpdate = appContext.receivingPointUserUpdateState$.subscribe((dealOffer) => {
      setData(i => ({ ...i, data: i.data.map(i => i.id == dealOffer.id ? ({ ...i, ...dealOffer }) : i) }))
    })

    return () => {
      subscriptionDelete.unsubscribe()
      subscriptionUpdate.unsubscribe()
    }
  }, [data])
  const fetch = async ({page}: { page: number } = {page: 1}) => {
    const res = await ReceivingPointUserRepository.fetch({
      ...filterRef.current,
      ...(props.receivingPointId ? {receivingPointId: props.receivingPointId} : {}),
      limit: filterRef.current.limit ?? limit,
      page
    })
    setData(page > 1 ? (i) => ({total: res.total, data: [...i.data, ...res.data]}) : res)

  }
  const reFetch = () => {
    setPage(1)
    setData({data: [], total: 0})
    setIsLoaded(false)
    fetch({page: 1})

  }
  const value: IState = {
    ...defaultValue,
    isLoaded,
    isLoading,
    data,
    page,
    setPage: (page) => {
      setPage(page)
      fetch({page})
    },
    filter,
    setFilter: async (data) => {
      filterRef.current = data
      setFilter(data)
      setIsLoading(true)
      setPage(1)
      await fetch({ page: 1 })
      setIsLoading(false)
    },
    reFetch,
    fetchMore: () => {
      setPage(i => i+1)
      fetch({page: page + 1})
    }
  }


  return (
    <UserListOwnerContext.Provider value={value}>
      {props.children}
    </UserListOwnerContext.Provider>
  )
}

export function useUserListOwnerContext() {
  return useContext(UserListOwnerContext)
}
