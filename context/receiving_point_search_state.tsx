import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IPagination} from 'types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointRepository from '@/data/repositories/ReceivingPointRepository'
import {IReceivingPointSearchRequest} from '@/data/interfaces/IReceivingPointSearchRequest'

export enum ViewType{
  List = 'list',
  Map = 'map'
}
interface IReceivingPointFilter extends IReceivingPointSearchRequest {

}

interface IState {
  filter: IReceivingPointFilter
  data: IPagination<IReceivingPoint>
  page: number
  setPage: (page: number) => void
  setFilter: (data: IReceivingPointFilter) => void
  viewType: ViewType,
  setViewType: (view: ViewType) => void,
}

const defaultValue: IState = {
  filter: {page: 1, limit: 10},
  data: {data: [], total: 0},
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
  const [data, setData] = useState<IPagination<IReceivingPoint>>({data: [], total: 0})
  const [filter, setFilter] = useState<IReceivingPointFilter>( {page: 1, limit: 10})
  const [page, setPage] = useState<number>(1)
  const [viewType, setViewType] = useState<ViewType>(ViewType.List)
  const filterRef = useRef<IReceivingPointFilter>(filter)
  useEffect(() => {
    filterRef.current = filter
  }, [filter])
  const fetch = async ({page}: { page: number } = {page: 1}) => {
    const res = await ReceivingPointRepository.search({...filterRef.current, page})
    setData(res)
  }

  useEffect(() => {
    fetch({page: 1})
  }, [])

  const value: IState = {
    ...defaultValue,
    data,
    filter,
    page,
    viewType,
    setPage: (page) => {
      setPage(page)
      fetch({page})
    },
    setViewType: (viewType) => setViewType(viewType)
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
