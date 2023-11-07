import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IPagination, ListViewType} from 'types/types'
import {ISaleRequestSearchRequest} from '@/data/interfaces/ISaleRequestSearchRequest'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import SaleRequestRepository from '@/data/repositories/SaleRequestRepository'
import {SortOrder} from '@/types/enums'
import {omit} from '@/utils/omit'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import {CanceledError} from 'axios'

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
  sortOrder: SortOrder,
  setSortOrder: (sort: SortOrder) => void,
  setFilter: (data: ISaleRequestFilter) => void
  viewType: ListViewType,
  setViewType: (view: ListViewType) => void,
  reFetch: () => void
  fetchMore: () => void
}

const defaultValue: IState = {
  filter: {page: 1, limit: 10},
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  sortOrder: SortOrder.Desc,
  setSortOrder: (sort: SortOrder) => null,
  setFilter: (data: ISaleRequestFilter) => null,
  viewType: ListViewType.List,
  setViewType: (view: ListViewType) => null,
  reFetch: () => null,
  fetchMore: () => null,
}

const SaleRequestSearchContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode

}

export function SaleRequestSearchWrapper(props: Props) {
  const [data, setData] = useState<IPagination<ISaleRequest>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [filter, setFilter] = useState<ISaleRequestFilter>({page: 1, limit: 10})
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc)
  const [page, setPage] = useState<number>(1)
  const [viewType, setViewType] = useState<ListViewType>(ListViewType.List)
  const filterRef = useRef<ISaleRequestFilter>(filter)
  const sortOrderRef = useRef<SortOrder>(sortOrder)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = 15
  useEffect(() => {
    filterRef.current = filter
  }, [filter])

  useEffect(() => {
    sortOrderRef.current = sortOrder
  }, [sortOrder])
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
      const res = await SaleRequestRepository.search({
        ...omit(filterRef.current, ['requiresDelivery', 'requiresLoading']),
        ...(!filterRef?.current?.location ? {
          location: {
            lat: 56.795132,
            lng: 40.1633231
          }
        } : {}),
        ...(filterRef.current.requiresDelivery ? {requiresDelivery: true} : {}),
        ...(filterRef.current.requiresLoading ? {requiresLoading: true} : {}),
        ...(sortOrderRef.current ? {sortOrder: sortOrderRef.current} : {}), page, limit
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
    console.log('useEffectOnce11')
    init()
  })
  const reFetch = () => {
    setPage(1)
    setData({data: [], total: 0})
    setIsLoaded(false)
    fetch({page: 1})

  }
  const value: IState = {
    ...defaultValue,
    data,
    isLoaded,
    isLoading,
    filter,
    page,
    viewType,
    setPage: (page) => {
      setPage(page)
      fetch({page})
    },
    setViewType: (viewType) => setViewType(viewType),
    sortOrder,
    setSortOrder: async (sortOrder) => {
      sortOrderRef.current = sortOrder
      setSortOrder(sortOrder)
      reFetch()
    },
    setFilter: async (data) => {
      filterRef.current = data
      setFilter(data)
      reFetch()
    },
    reFetch,
    fetchMore: () => {
      setPage(i => i + 1)
      fetch({page: page + 1})
    },
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
