import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { IPagination } from 'types/types'
import { ISaleRequestSearchRequest } from '@/data/interfaces/ISaleRequestSearchRequest'
import { ISaleRequest } from '@/data/interfaces/ISaleRequest'
import SaleRequestRepository from '@/data/repositories/SaleRequestRepository'

export enum ViewType {
  List = 'list',
  Map = 'map'
}
interface ISaleRequestFilter extends ISaleRequestSearchRequest {
  id?: number | null
}

interface IState {
  filter: ISaleRequestFilter
  data: IPagination<ISaleRequest>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  setFilter: (data: ISaleRequestFilter) => void
  viewType: ViewType,
  setViewType: (view: ViewType) => void,
}

const defaultValue: IState = {
  filter: { page: 1, limit: 10 },
  data: { data: [], total: 0 },
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  setFilter: (data: ISaleRequestFilter) => null,
  viewType: ViewType.List,
  setViewType: (view: ViewType) => null,
}

const SaleRequestSearchContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode

}

export function SaleRequestSearchWrapper(props: Props) {
  const [data, setData] = useState<IPagination<ISaleRequest>>({ data: [], total: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [filter, setFilter] = useState<ISaleRequestFilter>({ page: 1, limit: 10 })
  const [page, setPage] = useState<number>(1)
  const [viewType, setViewType] = useState<ViewType>(ViewType.List)
  const filterRef = useRef<ISaleRequestFilter>(filter)

  useEffect(() => {
    filterRef.current = filter
  }, [filter])
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  const fetch = async ({ page }: { page: number } = { page: 1 }) => {
    const res = await SaleRequestRepository.search({ ...filterRef.current, page })
    setData(res)
  }

  useEffect(() => {
    init()
  }, [])

  const value: IState = {
    ...defaultValue,
    data,
    filter,
    page,
    viewType,
    setPage: (page) => {
      setPage(page)
      fetch({ page })
    },
    setViewType: (viewType) => setViewType(viewType),
    setFilter: async (data) => {
      filterRef.current = data
      setFilter(data)
      setIsLoading(true)
      setPage(1)
      await fetch({ page: 1 })
      setIsLoading(false)
    }
  }


  return (
    <SaleRequestSearchContext.Provider value={value}>
      {props.children}
    </SaleRequestSearchContext.Provider>
  )
}

export function useSaleRequestSearchContext() {
  return useContext(SaleRequestSearchContext)
}
