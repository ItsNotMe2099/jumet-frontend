import {createContext, useContext, useRef, useState} from 'react'
import { Nullable} from 'types/types'
import {useAppContext} from '@/context/state'
import {CanceledError} from 'axios'
import IReportDashboard from '@/data/interfaces/IReportDashboard'
import ReportRepository from '@/data/repositories/ReportRepository'
import {IReportDashboardRequest} from '@/data/interfaces/IReportDashboardRequest'

export interface IReportDashBoardFilter extends IReportDashboardRequest {
}

interface IState {
  data: Nullable<IReportDashboard>
  isLoaded: boolean
  isLoading: boolean
  filter: IReportDashBoardFilter
  setFilter: (data: IReportDashBoardFilter) => void
  reFetch: () => Promise<Nullable<IReportDashboard>>
}

const defaultValue: IState = {
  data: null,
  isLoaded: false,
  isLoading: false,
  filter: {},
  setFilter: (data: IReportDashBoardFilter) => null,
  reFetch: async () => null
}

const ReportDashboardBuyerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function ReportDashboardBuyerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<Nullable<IReportDashboard>>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [filter, setFilter] = useState<IReportDashBoardFilter>({interval: 'day'})
  const filterRef = useRef<IReportDashBoardFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetch = async ({page}: { page: number } = {page: 1}): Promise<Nullable<IReportDashboard>> => {
    setIsLoading(true)
    let res: Nullable<IReportDashboard> = null
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
       res = await ReportRepository.fetchDashBoard({
        ...filterRef.current
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
    setData(null)
    setIsLoaded(false)
    return fetch()
  }
  const value: IState = {
    ...defaultValue,
    isLoaded,
    isLoading,
    data,
    filter,
    setFilter: async (data) => {
      filterRef.current = data
      setFilter(data)
      reFetch()
    },
    reFetch,
  }


  return (
    <ReportDashboardBuyerContext.Provider value={value}>
      {props.children}
    </ReportDashboardBuyerContext.Provider>
  )
}

export function useReportDashboardBuyerContext() {
  return useContext(ReportDashboardBuyerContext)
}
