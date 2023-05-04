import request from 'utils/request'
import IAboutMe from '../interfaces/IAboutMe'

export default class UserRepository {

  static async fetchAboutMe(token?: string): Promise<IAboutMe> {
    return request({url: '/api/', token})
  }

  static async deleteMyFile(id: number): Promise<void> {
    return request({
      url: `/api/`,
      method: 'delete',
    })
  }
}
