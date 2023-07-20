import {Address} from 'src/entity/Address'
import {CoordinatesDto} from 'src/common/dto/CoordinatesDto'
import {ScrapMetalCategory} from '../common/types/ScrapMetalCategory'
import {SaleRequestStatus} from '../enum/SaleRequestStatus'
import IFile from '@/data/interfaces/IFile'

export class ISaleRequest {
  id: number
  status?: SaleRequestStatus
  location: CoordinatesDto
  photos: IFile[]
  photosIds: number[]
  scrapMetalCategory: ScrapMetalCategory
  requiresDelivery: boolean
  requiresLoading: boolean
  contacts: any[]
  address: Address
  phones?: string[]
  ownerId?: string
  price: number
  weight: number
  searchRadius: number
  createdAt: Date
}
