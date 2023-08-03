import request from 'utils/request'
import {  IPagination } from 'types/types'
import {LikeEntityType} from '@/data/enum/LikeEntityType'
import {IFavoriteRecord} from '@/data/interfaces/IFavoriteRecord'
import {FavoriteStoreType} from '@/data/interfaces/FavoriteStoreType'

export default class FavoriteRepository {
  static async create(id: number, type: LikeEntityType): Promise<void> {
    return request({
      url: '/api/like',
      method: 'post',
      data: {
        id,
        type,
      }
    })
  }

  static async delete(id: number, type: LikeEntityType): Promise<void> {
    return request({
      url: `/api/like?id=${id}&type=${type}`,
      method: 'delete',
    })
  }

  static async fetchStatus(list: IFavoriteRecord[]): Promise<FavoriteStoreType> {
    const split: any = {}

    list.forEach(item => {
      if (!split[item.entityType]) {
        split[item.entityType] = []
      }
      if (!(split[item.entityType] as number[]).includes(item.id)) {
        split[item.entityType].push(item.id)
      }
    })

    return request({
      url: '/api/like/liked',
      method: 'post',
      data: split,
    })
  }

  static async fetchByType<T>(type: LikeEntityType): Promise<IPagination<T>> {
    return request({
      url: `/api/like?type=${type}`,
      method: 'get',
      disableCache: true,
    })
  }
}
