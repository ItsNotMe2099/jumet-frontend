import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IPagination} from 'types/types'
import {IDealOffer} from '@/data/interfaces/IDealOffer'
import DealOfferOwnerRepository from '@/data/repositories/DealOfferOwnerRepository'
import {IDealOfferOwnerListRequest} from '@/data/interfaces/IDealOfferOwnerListRequest'
import {useAppContext} from '@/context/state'
import {DealOfferStatus} from '@/data/enum/DealOfferStatus'
import {CanceledError} from 'axios'

export interface IDealOfferFilter extends IDealOfferOwnerListRequest {
}

interface IState {
  data: IPagination<IDealOffer>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
  filter: IDealOfferFilter
  setFilter: (data: IDealOfferFilter) => void
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
  setFilter: (data: IDealOfferFilter) => null,
  reFetch: () => null,
  fetchMore: () => null
}

const DealOfferListOwnerContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  limit?: number
}

export function DealOfferListOwnerWrapper(props: Props) {
  const appContext = useAppContext()
  const [data, setData] = useState<IPagination<IDealOffer>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [filter, setFilter] = useState<IDealOfferFilter>({page: 1, limit: 10})
  const filterRef = useRef<IDealOfferFilter>(filter)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  useEffect(() => {
    const subscription = appContext.dealOfferUpdateState$.subscribe((dealOffer) => {
      setData(i => ({...i, data: i.data.map(i => i.id == dealOffer.id ? ({...i, ...dealOffer}) : i)}))

      if (dealOffer.status === DealOfferStatus.Accepted && (filter.statuses?.length ?? 0) === 0 && data.data.find(i => i.id === dealOffer.id)) {
        //  setData(i => ({ ...i, data: i.data.filter(i => i.id !== dealOffer.id ), total: i.total - 1}))
      }
      if (dealOffer.status === DealOfferStatus.Rejected && (filter.statuses?.length ?? 0) === 0 && data.data.find(i => i.id === dealOffer.id)) {
        // setData(i => ({ ...i, data: i.data.filter(i => i.id !== dealOffer.id ), total: i.total - 1}))
      }
    })
    return () => {
      subscription.unsubscribe()
    }
  }, [data])
  const fetch = async ({page}: { page: number } = {page: 1}) => {
    setIsLoading(true)
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    abortControllerRef.current = new AbortController()
    try {
      const res = await DealOfferOwnerRepository.fetch({
        ...filterRef.current,
        ...(props.saleRequestId ? {saleRequestId: props.saleRequestId} : {}),
        limit: filterRef.current.limit ?? limit,
        page
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
    }
  }


  return (
    <DealOfferListOwnerContext.Provider value={value}>
      {props.children}
    </DealOfferListOwnerContext.Provider>
  )
}

export function useDealOfferListOwnerContext() {
  return useContext(DealOfferListOwnerContext)
}
