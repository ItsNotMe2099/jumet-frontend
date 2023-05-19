import { IPageable } from 'types/types'

export default interface IPage extends IPageable{
  id: number
  published: boolean;
  slug: string;
  body: string;
}
