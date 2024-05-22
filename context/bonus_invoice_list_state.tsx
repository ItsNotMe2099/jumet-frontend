import {createContext, useContext, useEffect, useMemo, useRef, useState} from 'react'
import {IPagination} from 'types/types'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import BonusInvoiceRepository from '@/data/repositories/BonusInvoiceRepository'
import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'
import IBonusInvoice from '@/data/interfaces/IBonusInvoice'

export interface IBonusInvoiceFilter extends IPaginationRequest {
}

interface IState {
  data: IPagination<IBonusInvoice>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IBonusInvoiceFilter
  setFilter: (data: IBonusInvoiceFilter) => void
  reFetch: () => Promise<IPagination<IBonusInvoice>>
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
  setFilter: (data: IBonusInvoiceFilter) => null,
  reFetch: async () => ({data: [], total: 0}),
  fetchMore: () => null,
  pageCount: 0
}

const BonusInvoiceListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function BonusInvoiceListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IBonusInvoice>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IBonusInvoiceFilter>({page: 1, limit: props.limit ?? 10})
  const filterRef = useRef<IBonusInvoiceFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscription = appContext.bonusInvoiceCreatedState$.subscribe((bonusInvoice) => {
      setData(i => ({...i, data: [bonusInvoice, ...i.data]}))
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [data])
  const fetch = async ({page}: { page: number } = {page: 1}): Promise<IPagination<IBonusInvoice>> => {
    setIsLoading(true)
    let res: IPagination<IBonusInvoice> = {data: [], total: 0}
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await BonusInvoiceRepository.fetch({
        ...filterRef.current,
       limit: filterRef.current.limit ?? limit,
        page
      }, {signal: abortControllerRef.current?.signal})
      setData(res)

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
    <BonusInvoiceListOwnerContext.Provider value={value}>
      {props.children}
    </BonusInvoiceListOwnerContext.Provider>
  )
}

export function useBonusInvoiceListOwnerContext() {
  return useContext(BonusInvoiceListOwnerContext)
}
