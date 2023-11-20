import {EmployeeRole} from '@/data/enum/EmployeeRole'
import {Gender} from '@/data/enum/Gender'
import {Nullable} from '@/types/types'

export interface IEmployeeCreateRequest {
  employeeRole: EmployeeRole;
  name?: Nullable<string>;
  firstName?: Nullable<string>;
  lastName?: Nullable<string>;
  patronymic?: Nullable<string>;
  email: Nullable<string>;
  birthday?: Nullable<Date>;
  gender?: Nullable<Gender>;
  receivingPointIds?: number[];
}
