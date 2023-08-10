import request from 'utils/request'
import {DeepPartial} from '@/types/types'
import IUser from '@/data/interfaces/IUser'

export default class UserOwnerRepository {
  static async update(id: string, data: DeepPartial<IUser>): Promise<IUser> {
    const res = await request<IUser>({
      method: 'put',
      url: `/api/user/${id}`,
      data,
    })
    return res
  }
}
