import {Nullable} from '@/types/types'

export interface IDealCalculateRequest{
  actualWeight: Nullable<number>,
  actualRubbishInPercents: Nullable<number>,
  price: Nullable<number>,
  deliveryPrice: Nullable<number>,
  loadingPrice: Nullable<number>
}
