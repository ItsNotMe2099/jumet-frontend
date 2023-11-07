import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IRepresentative} from '@/data/interfaces/IRepresentative'
import {IPagination} from '@/types/types'
import {useAppContext} from '@/context/state'
import {IRepresentativeListRequest} from '@/data/interfaces/IRepresentativeListRequest'
import {CanceledError} from 'axios'
import RepresentativeRepository from '@/data/repositories/RepresentativeRepository'
import {useEffectOnce} from '@/components/hooks/useEffectOnce'

interface IState {
  data: IPagination<IRepresentative>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IRepresentativeListRequest
  setFilter: (data: IRepresentativeListRequest) => void
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
  setFilter: (data: IRepresentativeListRequest) => null,
  reFetch: () => null,
  fetchMore: () => null,
}

const RepresentativeListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function RepresentativeListWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IRepresentative>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IRepresentativeListRequest>({page: 1, limit: 10})
  const filterRef = useRef<IRepresentativeListRequest>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)
  const limit = props.limit ?? 12

  useEffect(() => {
    const subscriptionCreate = appContext.representativeCreateState$.subscribe((representative) => {
      reFetch()
    })
    const subscriptionUpdate = appContext.representativeUpdateState$.subscribe((representative) => {
      if (data.data.find(i => i.id === representative.id)) {
        setData((i) => ({...i, data: i.data.map((i) => i.id === representative.id ? {...i, ...representative} : i)}))
      }
    })
    const subscriptionDelete = appContext.representativeDeleteState$.subscribe((representative) => {
      if (data.data.find(i => i.id === representative.id)) {
        setData((i) => ({...i, data: i.data.filter((i) => i.id !== representative.id), total: i.total - 1}))
      }
    })
    return () => {
      subscriptionCreate.unsubscribe()
      subscriptionUpdate.unsubscribe()
      subscriptionDelete.unsubscribe()
    }
  }, [data])
  useEffectOnce(() => {
    console.log('Refetch11')
    reFetch()
  })
  const fetch = async ({page}: { page: number } = {page: 1}) => {
    setIsLoading(true)
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
      const res = await RepresentativeRepository.fetch({
        ...filterRef.current,
        limit: filterRef.current.limit ?? limit,
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
    },
  }


  return (
    <RepresentativeListContext.Provider value={value}>
      {props.children}
    </RepresentativeListContext.Provider>
  )
}

export function useRepresentativeListContext() {
  return useContext(RepresentativeListContext)
}

