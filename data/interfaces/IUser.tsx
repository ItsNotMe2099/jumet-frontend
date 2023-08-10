import {UserRole} from '@/data/enum/UserRole'
import {Gender} from '@/data/enum/Gender'
import {EmployeeRole} from '@/data/enum/EmployeeRole'

export default interface IUser {
  id: string;
  role: UserRole;
  phone: string;
  login: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  companyName: string;
  isRegistered: boolean;
  email: string;
  birthday?: Date;
  gender: Gender;
  password: string;
  employeeRole?: EmployeeRole;
  readedNotifications: Notification[];
//  companies?: Company[];
}
