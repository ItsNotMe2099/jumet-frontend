import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IPagination} from 'types/types'
import {IDeal} from '@/data/interfaces/IDeal'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {IDealListRequest} from '@/data/interfaces/IDeaListRequest'
import DealRepository from '@/data/repositories/DealRepository'

export interface IDealFilter extends IDealListRequest {
}

interface IState {
  data: IPagination<IDeal>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IDealFilter
  setFilter: (data: IDealFilter) => void
  reFetch: () => Promise<IPagination<IDeal>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: IDealFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null
}

const DealListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function DealListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IDeal>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IDealFilter>({page: 1, limit: props.limit ?? 10})
  const filterRef = useRef<IDealFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscription = appContext.dealUpdateState$.subscribe((deal) => {
      setData(i => ({...i, data: i.data.map(i => i.id == deal.id ? ({...i, ...deal}) : i)}))
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [data])
  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IDeal>> => {
    setIsLoading(true)
    let res: IPagination<IDeal> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await DealRepository.fetch({
        ...filterRef.current,
       limit: filterRef.current.limit ?? limit,
        page
      }, {signal: abortControllerRef.current?.signal})
      setData(page > 1 ? (i) => ({total: res.total, data: [...i.data, ...res.data]}) : res)

    } catch (err) {
      if (err instanceof CanceledError) {
        return res
      }
    }
    setIsLoaded(true)
    setIsLoading(false)
    return res
  }

  const reFetch = () => {
    setPage(1)
    setData({data: [], total: 0})
    setIsLoaded(false)
    return fetch({page: 1})
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
      reFetch()
    },
    reFetch,
    fetchMore: () => {
      setPage(i => i + 1)
      fetch({page: page + 1})
    }
  }


  return (
    <DealListOwnerContext.Provider value={value}>
      {props.children}
    </DealListOwnerContext.Provider>
  )
}

export function useDealListOwnerContext() {
  return useContext(DealListOwnerContext)
}
