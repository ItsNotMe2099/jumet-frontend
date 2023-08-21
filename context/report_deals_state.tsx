import {createContext, useContext, useRef, useState} from 'react'
import { Nullable} from 'types/types'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import IReportDeals from '@/data/interfaces/IReportDeals'
import ReportRepository from '@/data/repositories/ReportRepository'
import {IReportDealsRequest} from '@/data/interfaces/IReportDealsRequest'

export interface IReportDealsFilter extends IReportDealsRequest {
}

interface IState {
  data: IReportDeals
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IReportDealsFilter
  setFilter: (data: IReportDealsFilter) => void
  reFetch: () => Promise<Nullable<IReportDeals>>
  fetchMore: () => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  filter: {},
  setFilter: (data: IReportDealsFilter) => null,
  reFetch: async () => null,
  fetchMore: () => null
}

const ReportDealsBuyerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function ReportDealsBuyerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IReportDeals>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IReportDealsFilter>({interval: 'day'})
  const filterRef = useRef<IReportDealsFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetch = async ({page}: { page: number } = {page: 1}): Promise<Nullable<IReportDeals>> => {
    setIsLoading(true)
    let res: Nullable<IReportDeals> = null
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await ReportRepository.fetchDeals({
        ...filterRef.current
      }, {signal: abortControllerRef.current?.signal})
      setData(page > 1 ? (i) => ({...res, total: res!.total, data: [...i.data, ...res!.data]}) : res)


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
    setData({data: [], total: 0})
    setIsLoaded(false)
    return fetch()
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
    <ReportDealsBuyerContext.Provider value={value}>
      {props.children}
    </ReportDealsBuyerContext.Provider>
  )
}

export function useReportDealsBuyerContext() {
  return useContext(ReportDealsBuyerContext)
}
