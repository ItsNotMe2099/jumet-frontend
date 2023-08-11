import request from 'utils/request'
import {ICurrentUserUpdateRequest} from '@/data/interfaces/ICurrentUserUpdateRequest'
import IUser from '@/data/interfaces/IUser'

export default class CurrentUserRepository {

  static async update(data: ICurrentUserUpdateRequest): Promise<IUser> {
    const res = await request<IUser>({
      method: 'put',
      url: '/api/current-user',
      data,
    })
    return res
  }

}
