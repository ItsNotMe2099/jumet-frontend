import {createContext, useContext, useMemo, useRef, useState} from 'react'
import {IPagination} from 'types/types'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import BonusTransactionRepository from '@/data/repositories/BonusTransactionRepository'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import IBonusTransaction from '@/data/interfaces/IBonusTranaction'

export interface IBonusTransactionFilter extends IPaginationRequest {
}

interface IState {
  data: IPagination<IBonusTransaction>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IBonusTransactionFilter
  setFilter: (data: IBonusTransactionFilter) => void
  reFetch: () => Promise<IPagination<IBonusTransaction>>
  fetchMore: () => void
  pageCount: number
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {page: 1, limit: 10},
  setFilter: (data: IBonusTransactionFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null,
  pageCount: 0
}

const BonusTransactionListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function BonusTransactionListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IBonusTransaction>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IBonusTransactionFilter>({page: 1, limit: props.limit ?? 10})
  const filterRef = useRef<IBonusTransactionFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 10
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }

  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IBonusTransaction>> => {
    setIsLoading(true)
    let res: IPagination<IBonusTransaction> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await BonusTransactionRepository.fetch({
        ...filterRef.current,
       limit,
        page
      }, {signal: abortControllerRef.current?.signal})
      setData( res)

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
  const pageCount = useMemo<number>(() => Math.ceil(data.total / limit), [data.total, limit])
  const value: IState = {
    ...defaultValue,
    isLoaded,
    isLoading,
    data,
    page,
    pageCount,
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
    <BonusTransactionListOwnerContext.Provider value={value}>
      {props.children}
    </BonusTransactionListOwnerContext.Provider>
  )
}

export function useBonusTransactionListOwnerContext() {
  return useContext(BonusTransactionListOwnerContext)
}
