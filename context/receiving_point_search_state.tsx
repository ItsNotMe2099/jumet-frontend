import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IPagination, Nullable} from 'types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointRepository from '@/data/repositories/ReceivingPointRepository'
import {IReceivingPointSearchRequest} from '@/data/interfaces/IReceivingPointSearchRequest'
import {omit} from '@/utils/omit'
import {SortOrder} from '@/types/enums'
import {CanceledError} from 'axios'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'
import {useDataContext} from '@/context/data_state'
import {ScrapMetalCategory} from '@/data/enum/ScrapMetalCategory'

export enum ViewType {
  List = 'list',
  Map = 'map'
}

interface IReceivingPointFilter extends IReceivingPointSearchRequest {
  scrapMetalCategory?: Nullable<ScrapMetalCategory>;
}

interface IState {
  filter: IReceivingPointFilter
  data: IPagination<IReceivingPoint>
  isLoaded: boolean
  isLoading: boolean
  page: number
  sortOrder: SortOrder,
  setSortOrder: (sort: SortOrder) => void,
  setPage: (page: number) => void
  setFilter: (data: IReceivingPointFilter) => void
  viewType: ViewType,
  setViewType: (view: ViewType) => void,
  reFetch: () => void
  fetchMore: () => void
}

const defaultValue: IState = {
  filter: {
    page: 1, limit: 10, location: {
      lat: 56.795132,
      lng: 40.1633231
    }
  },
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  sortOrder: SortOrder.Desc,
  setSortOrder: (sort: SortOrder) => null,
  setPage: (page: number) => null,
  setFilter: (data: IReceivingPointFilter) => null,
  viewType: ViewType.List,
  setViewType: (view: ViewType) => null,
  reFetch: () => null,
  fetchMore: () => null,
}

const ReceivingPointSearchContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode

}

export function ReceivingPointSearchWrapper(props: Props) {
  const dataContext = useDataContext()
  const [data, setData] = useState<IPagination<IReceivingPoint>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [filter, setFilter] = useState<IReceivingPointFilter>({page: 1, limit: 10})
  const [page, setPage] = useState<number>(1)
  const [viewType, setViewType] = useState<ViewType>(ViewType.List)
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.Desc)
  const filterRef = useRef<IReceivingPointFilter>(filter)
  const sortOrderRef = useRef<SortOrder>(sortOrder)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = 30
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
      const getSynonymCategories = () => {
        return dataContext.scrapMetalCategories.filter(i => (dataContext.scrapMetalCategoriesMap[filterRef.current.scrapMetalCategory!]?.synonymIds ?? []).includes(i.id)).map(i => i.category)
      }
      const res = await ReceivingPointRepository.search({
        ...omit(filterRef.current, ['hasDelivery', 'hasLoading', 'scrapMetalCategory']), ...(!filterRef?.current?.location ? {
          location: {
            lat: 56.795132,
            lng: 40.1633231
          }
        } : {}),
        ...(filterRef.current.hasDelivery ? {hasDelivery: true} : {}),
        ...(filterRef.current.hasLoading ? {hasLoading: true} : {}),
        ...(sortOrderRef.current ? {sortOrder: sortOrderRef.current} : {}),
        ...(filterRef.current.scrapMetalCategory ? {scrapMetalCategories: [filterRef.current.scrapMetalCategory, ...getSynonymCategories()]} : {}),
        page,
        limit
      }, {signal: abortControllerRef.current?.signal})
      setData(page > 1 ? (i) => ({total: res.total, data: [...i.data, ...res.data]}) : res)

    } catch (err) {
      if(err instanceof CanceledError){
        return
      }
    }
    setIsLoaded(true)
    setIsLoading(false)
  }

  useEffectOnce(() => {
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
    isLoaded,
    isLoading,
    data,
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
    <ReceivingPointSearchContext.Provider value={value}>
      {props.children}
    </ReceivingPointSearchContext.Provider>
  )
}

export function useReceivingPointSearchContext() {
  return useContext(ReceivingPointSearchContext)
}
