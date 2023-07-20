import request from 'utils/request'
import {IScrapMetalCategory} from '@/data/interfaces/IScrapMetalCategory'

export default class ScrapMetalCategoryRepository {
  static async fetch(): Promise<IScrapMetalCategory[]> {
    const res = await request<IScrapMetalCategory[]>({
      method: 'post',
      url: '/api/scrap-metal-category-description',
    })
    return res
  }

}
