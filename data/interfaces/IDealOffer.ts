import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {ISaleRequest} from '@/data/interfaces/ISaleRequest'
import {DealOfferStatus} from '@/data/enum/DealOfferStatus'
import IUser from '@/data/interfaces/IUser'
import {IDeal} from '@/data/interfaces/IDeal'
import {Nullable} from '@/types/types'

export interface IDealOffer {
  id: number
  receivingPoint?: IReceivingPoint
  receivingPointId: number | null
  saleRequest?: ISaleRequest
  saleRequestId?: number
  status: DealOfferStatus
  coverLetter?: string
  price: number | null
  deliveryPrice: number | null
  loadingPrice: number | null
  rubbishInPercents: number | null
  manager?: IUser
  ownerId?: string
  createdAt: string
  dealId?: number
  deal: Nullable<IDeal>
}
