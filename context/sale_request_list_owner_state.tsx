import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IPagination} from 'types/types'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import SaleRequestOwnerRepository from '@/data/repositories/SaleRequestOwnerRepository'
import {ISaleRequestOwnerListRequest} from '@/data/interfaces/ISaleRequestOwnerListRequest'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'

interface ISaleRequestFilter extends ISaleRequestOwnerListRequest {
}

interface IState {
  data: IPagination<ISaleRequest>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: ISaleRequestFilter
  setFilter: (data: ISaleRequestFilter) => void
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
  setFilter: (data: ISaleRequestFilter) => null,
  reFetch: () => null,
  fetchMore: () => null
}

const SaleRequestListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function SaleRequestListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<ISaleRequest>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<ISaleRequestFilter>({page: 1, limit: 10})
  const filterRef = useRef<ISaleRequestFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  const fetch = async ({page}: { page: number } = {page: 1}) => {
    setIsLoading(true)
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
      const res = await SaleRequestOwnerRepository.fetch({
        ...filterRef.current,
        limit: filterRef.current.limit ?? limit,
        page
      }, {signal: abortControllerRef.current?.signal})
      setData(page > 1 ? (i) => ({total: res.total, data: [...i.data, ...res.data]}) : res)

    } catch (err) {
      if (err instanceof CanceledError) {
        return
      }
    }
    setIsLoaded(true)
    setIsLoading(false)
  }
  useEffectOnce(() => {
    init()
  })

  useEffect(() => {
    const subscription = appContext.saleRequestUpdateState$.subscribe((saleRequest) => {
      setData(i => ({...i, data: i.data.map(i => i.id == saleRequest.id ? ({...i, ...saleRequest}) : i)}))
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [data])
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
      reFetch()
    },
    reFetch,
    fetchMore: () => {
      setPage(i => i + 1)
      fetch({page: page + 1})
    }
  }


  return (
    <SaleRequestListOwnerContext.Provider value={value}>
      {props.children}
    </SaleRequestListOwnerContext.Provider>
  )
}

export function useSaleRequestListOwnerContext() {
  return useContext(SaleRequestListOwnerContext)
}
