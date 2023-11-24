import {SaleRequestStatus} from '../enum/SaleRequestStatus'
import IFile from '@/data/interfaces/IFile'
import { IAddress } from './IAddress'
//import { IScrapMetalCategory } from './IScrapMetalCategory'
import { ILocation } from './ILocation'
import { ScrapMetalCategory } from '../enum/ScrapMetalCategory'
import {Nullable} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'

export interface ISaleRequest {
  id: number
  status: SaleRequestStatus
  location: ILocation
  photos: IFile[]
  photosIds: number[]
  scrapMetalCategory: ScrapMetalCategory
  requiresDelivery: boolean
  requiresLoading: boolean
  contacts: any[]
  address: IAddress | null
  phone?: string
  ownerId?: string
  price: number
  weight: number
  offersCount: number
  newOffersCount: number
  searchRadius: number
  createdAt: string
  receivingPoint: Nullable<IReceivingPoint>
  receivingPointId: Nullable<number>
  dealId?: number
}
