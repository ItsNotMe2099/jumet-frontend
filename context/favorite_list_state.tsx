import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IPagination} from 'types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {useAppContext} from '@/context/state'
import FavoriteRepository from '@/data/repositories/FavoriteRepository'
import {LikeEntityType} from '@/data/enum/LikeEntityType'
import {IFavoriteListRequest} from '@/data/interfaces/IFavoriteListRequest'

interface IFavoriteListFilter extends IFavoriteListRequest{
  sortOrder?: 'DESC' | 'ASC'
}

interface IState {
  data: IPagination<IReceivingPoint>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IFavoriteListFilter
  setFilter: (data: IFavoriteListFilter) => void
  reFetch: () => void
  fetchMore: () => void
  deleteFromFavorite: (id: number) => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: IFavoriteListFilter) => null,
  reFetch: () => null,
  fetchMore: () => null,
  deleteFromFavorite: (id: number) => null
}

const FavoriteListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function FavoriteListWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IReceivingPoint>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IFavoriteListFilter>({page: 1, limit: 10})
  const filterRef = useRef<IFavoriteListFilter>(filter)
  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  const fetch = async ({page}: { page: number } = {page: 1}) => {
    const res = await FavoriteRepository.fetchByType<IReceivingPoint>(LikeEntityType.receivingPoint,{
      ...filterRef.current,
      limit: filterRef.current.limit ?? limit,
      page
    })
    setData(res)
  }
  useEffect(() => {
    init()
  }, [])


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
    reFetch: () => {
      setPage(1)
      setData({data: [], total: 0})
      setIsLoaded(false)
      fetch({page: 1})
    },
    fetchMore: () => {
      setPage(i => i+1)
      fetch({page: page + 1})
    },
    deleteFromFavorite: async (id: number) => {
      if(data.data?.find(i => i.id === id)) {
        setData(i => ({...i, data: i.data.filter(i => i.id !== id), total: i.total - 1}))

        await FavoriteRepository.delete(id, LikeEntityType.receivingPoint)
      }
    }
  }


  return (
    <FavoriteListContext.Provider value={value}>
      {props.children}
    </FavoriteListContext.Provider>
  )
}

export function useFavoriteListContext() {
  return useContext(FavoriteListContext)
}
