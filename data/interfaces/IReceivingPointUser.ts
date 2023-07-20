import {ReceivingPointUserStatus} from '@/data/enum/ReceivingPointUserStatus'
import IUser from '@/data/interfaces/IUser'

export interface IReceivingPointUser {
  id: number;
  user: IUser;
  userId: string;
  receivingPointId: number;
  status: ReceivingPointUserStatus;
  email: string;
  name: string;
  createdAt: Date;
}
