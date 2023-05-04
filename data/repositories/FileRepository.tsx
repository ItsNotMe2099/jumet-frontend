import request from 'utils/request'
import IFile from 'data/interfaces/IFile'
import {AxiosRequestConfig} from 'axios'

export default class FileRepository {
  static async uploadFile(file: File, config?: AxiosRequestConfig): Promise<IFile> {
    return request({
      url: '/api/',
      file: file,
      method: 'put',
      config
    })
  }
}
