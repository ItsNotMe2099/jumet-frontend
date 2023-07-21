import {SaleRequestStatus} from '../enum/SaleRequestStatus'
import IFile from '@/data/interfaces/IFile'
import { IAddress } from './IAddress'
import { IScrapMetalCategory } from './IScrapMetalCategory'
import { ILocation } from './ILocation'

export interface ISaleRequest {
  id: number
  status?: SaleRequestStatus
  location: ILocation
  photos: IFile[]
  photosIds: number[]
  scrapMetalCategory: IScrapMetalCategory
  requiresDelivery: boolean
  requiresLoading: boolean
  contacts: any[]
  address: IAddress
  phones?: string[]
  ownerId?: string
  price: number
  weight: number
  searchRadius: number
  createdAt: Date
}
