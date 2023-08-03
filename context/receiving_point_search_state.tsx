import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { IPagination } from 'types/types'
import { IReceivingPoint } from '@/data/interfaces/IReceivingPoint'
import ReceivingPointRepository from '@/data/repositories/ReceivingPointRepository'
import { IReceivingPointSearchRequest } from '@/data/interfaces/IReceivingPointSearchRequest'
import {omit} from '@/utils/omit'

export enum ViewType {
  List = 'list',
  Map = 'map'
}

interface IReceivingPointFilter extends IReceivingPointSearchRequest {
}

interface IState {
  filter: IReceivingPointFilter
  data: IPagination<IReceivingPoint>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  setFilter: (data: IReceivingPointFilter) => void
  viewType: ViewType,
  setViewType: (view: ViewType) => void,
}

const defaultValue: IState = {
  filter: { page: 1, limit: 10, location: {
    lat: 56.795132,
    lng: 40.1633231
  } },
  data: { data: [], total: 0 },
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
  setFilter: (data: IReceivingPointFilter) => null,
  viewType: ViewType.List,
  setViewType: (view: ViewType) => null,
}

const ReceivingPointSearchContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode

}

export function ReceivingPointSearchWrapper(props: Props) {
  const [data, setData] = useState<IPagination<IReceivingPoint>>({ data: [], total: 0 })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [filter, setFilter] = useState<IReceivingPointFilter>({page: 1, limit: 10})
  const [page, setPage] = useState<number>(1)
  const [viewType, setViewType] = useState<ViewType>(ViewType.List)
  const filterRef = useRef<IReceivingPointFilter>(filter)
  useEffect(() => {
    filterRef.current = filter
  }, [filter])
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }

  const fetch = async ({page}: { page: number } = {page: 1}) => {
    const res = await ReceivingPointRepository.search({
      ...omit(filterRef.current, ['hasDelivery', 'hasLoading']), ...(!filterRef?.current?.location ? {
        location: {
          lat: 56.795132,
          lng: 40.1633231
        }
      } : {}),
      ...(filterRef.current.hasDelivery ? {hasDelivery: true} : {}),
      ...(filterRef.current.hasLoading ? {hasLoading: true} : {}),
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
    <ReceivingPointSearchContext.Provider value={value}>
      {props.children}
    </ReceivingPointSearchContext.Provider>
  )
}

export function useReceivingPointSearchContext() {
  return useContext(ReceivingPointSearchContext)
}
