import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import IUser from '@/data/interfaces/IUser'
import {ReviewStatus} from '@/data/enum/ReviewStatus'

export default interface IReview {
  id?: number;
  status: ReviewStatus;
  user?: IUser;
  receivingPoint?: IReceivingPoint;
  receivingPointId?: number;
  dealId?: number;
  mark: number;
  content: string;
  answer: string;
  createdAt?: string;
}
