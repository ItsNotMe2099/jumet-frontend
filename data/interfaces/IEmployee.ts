import {IReceivingPointUser} from '@/data/interfaces/IReceivingPointUser'
import IUser from '@/data/interfaces/IUser'

export default interface IEmployee extends IUser{
  receivingPointUsers: IReceivingPointUser[]
}
