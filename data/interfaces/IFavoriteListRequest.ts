import {IPaginationRequest} from '@/data/interfaces/IPaginationRequest'

export interface IFavoriteListRequest extends IPaginationRequest {
  sortOrder?: 'DESC' | 'ASC'
}
