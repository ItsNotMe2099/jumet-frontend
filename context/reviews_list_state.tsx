import {createContext, useContext, useEffect, useRef, useState} from 'react'
import {IPagination} from 'types/types'
import IReview from '@/data/interfaces/IReview'
import ReviewRepository from '@/data/repositories/ReviewRepository'
import {CanceledError} from 'axios'

interface IState {
  data: IPagination<IReview>
  isLoaded: boolean
  isLoading: boolean
  page: number
  setPage: (page: number) => void
}

const defaultValue: IState = {
  data: {data: [], total: 0},
  isLoaded: false,
  isLoading: false,
  page: 1,
  setPage: (page: number) => null,
}

const ReviewListContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  receivingPointId: number
  limit?: number
}

export function ReviewListWrapper(props: Props) {
  const [data, setData] = useState<IPagination<IReview>>({data: [], total: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const abortControllerRef = useRef<AbortController | null>(null)

  const limit = props.limit ?? 20
  const init = async () => {
    await Promise.all([fetch()])
    setIsLoaded(true)
  }
  const fetch = async ({page}: { page: number } = {page: 1}) => {
    setIsLoading(true)
    if (abortControllerRef.current) {
      abortControllerRef.current?.abort()
    }
    try {
      abortControllerRef.current = new AbortController()
      const res = await ReviewRepository.fetchByReceivingPointId(props.receivingPointId, {
        page,
        limit
      }, {signal: abortControllerRef.current?.signal})
    } catch (err) {
      if (err instanceof CanceledError) {
        return
      }
    }
    setIsLoaded(true)
    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [props.receivingPointId])
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
  }


  return (
    <ReviewListContext.Provider value={value}>
      {props.children}
    </ReviewListContext.Provider>
  )
}

export function useReviewListContext() {
  return useContext(ReviewListContext)
}
