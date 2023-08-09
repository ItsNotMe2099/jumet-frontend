import request from 'utils/request'

export default class DealRepository {

  static async fetchById(id: number): Promise<any> {
    const res = await request<any>({
      method: 'get',
      url: `/api/deal/${id}`,
    })
    return res
  }

  static async terminateBySeller(id: number): Promise<any> {
    const res = await request<any>({
      method: 'post',
      url: `/api/deal/${id}/terminateBySeller`,
    })
    return res
  }
}
