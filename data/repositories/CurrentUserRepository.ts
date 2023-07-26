import request from 'utils/request'
import {ISendCodeResponse} from '@/data/interfaces/ISendCodeResponse'
import {ICurrentUserUpdateRequest} from '@/data/interfaces/ICurrentUserUpdateRequest'

export default class CurrentUserRepository {

  static async update(data: ICurrentUserUpdateRequest): Promise<ISendCodeResponse> {
    const res = await request<ISendCodeResponse>({
      method: 'put',
      url: '/api/current-user',
      data,
    })
    return res
  }

}
