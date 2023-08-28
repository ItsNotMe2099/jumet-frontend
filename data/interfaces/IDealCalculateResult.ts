import {Nullable} from '@/types/types'

export interface IDealCalculateResult{
  total: number,
  subTotal: number,
  totalDelivery: Nullable<number>
  totalLoading: Nullable<number>
  deliveryPrice: Nullable<number>
  loadingPrice: Nullable<number>
  price: Nullable<number>
}
