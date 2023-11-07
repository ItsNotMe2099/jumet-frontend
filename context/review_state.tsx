import {createContext, useContext, useEffect, useState} from 'react'
import { Nullable} from '@/types/types'
import {useAppContext} from '@/context/state'
import IReview from '@/data/interfaces/IReview'
import ReviewRepository, {IReviewAnswerRequest, IReviewCreateRequest} from '@/data/repositories/ReviewRepository'

interface IState {
  reviewId: Nullable<number>,
  review: Nullable<IReview>,
  loading: boolean
  editLoading: boolean,
  dealId: number
  create: (data: IReviewCreateRequest) => Promise<Nullable<IReview>>,
  answer: (data: IReviewAnswerRequest) => Promise<Nullable<IReview>>,
}

const defaultValue: IState = {
  reviewId: 0,
  review: null,
  loading: false,
  editLoading: false,
  dealId: 0,
  create: async (data: IReviewCreateRequest) => null,
  answer: async (data: IReviewAnswerRequest) => null,
}

const ReviewContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode,
  dealId: number
  reviewId?: number,
  review?: Nullable<IReview>,
}

export function ReviewWrapper(props: Props) {
  const appContext = useAppContext()
  const [review, setReview] = useState<Nullable<IReview>>(props.review as Nullable<IReview>)
  const [loading, setLoading] = useState<boolean>(false)
  const [editLoading, setEditLoading] = useState<boolean>(false)
  useEffect(() => {
    setReview(props.review as Nullable<IReview>)

  }, [props.review])


  useEffect(() => {
    if (!props.review && props.reviewId) {

    }
  }, [props.reviewId, props.review])
  const handleUpdate = (entity: IReview) => {
    appContext.reviewUpdateState$.next(entity)
  }

  const handleCreate = (entity: IReview) => {
    appContext.reviewCreateState$.next(entity)
  }


  const create = async (data: IReviewCreateRequest): Promise<Nullable<IReview>> => {
    try {
      setEditLoading(true)
      const res = await ReviewRepository.create(data)
      setReview(res)
      handleCreate(res)
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }
  const answer = async (data: IReviewAnswerRequest): Promise<Nullable<IReview>> => {
    try {
      setEditLoading(true)
      const res = await ReviewRepository.answer(data)
      setReview(res)
      handleUpdate(res)
      setEditLoading(false)
      return res
    } catch (err) {

      setEditLoading(false)
      throw err
    }
  }

  const value: IState = {
    ...defaultValue,
    review,
    reviewId: props.reviewId ?? null,
    editLoading,
    loading,
    create,
    answer,
    dealId: props.dealId
  }
  return (
    <ReviewContext.Provider value={value}>
      {props.children}
    </ReviewContext.Provider>
  )
}

export function useReviewContext() {
  return useContext(ReviewContext)
}
