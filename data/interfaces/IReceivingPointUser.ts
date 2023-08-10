import {ReceivingPointUserStatus} from '@/data/enum/ReceivingPointUserStatus'
import IUser from '@/data/interfaces/IUser'
import {EmployeeRole} from '@/data/enum/EmployeeRole'
import {Nullable} from '@/types/types'

export interface IReceivingPointUser {
  id: number;
  user: IUser;
  userId: string;
  receivingPointId: number;
  status: ReceivingPointUserStatus;
  initialRole: EmployeeRole
  email: string;
  name: Nullable<string>;
  createdAt: Date;
}
