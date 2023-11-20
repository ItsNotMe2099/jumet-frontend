import IUser from '@/data/interfaces/IUser'
import {EmployeeRole} from '@/data/enum/EmployeeRole'
import {IRepresentative} from '@/data/interfaces/IRepresentative'
import {Nullable} from '@/types/types'

export default class UserUtils {
  static getName(user: IUser | null | IRepresentative | {
    name?: Nullable<string>
    firstName?: Nullable<string>
    lastName?: Nullable<string>
    patronymic?: Nullable<string>}): string {
    if (!user) {
      return ''
    }
    if(!user.firstName && !user?.lastName && !user.patronymic && user?.name){
      return user.name ?? ''
    }
    return  `${ (user?.firstName || user?.lastName) ? ` ${user?.lastName || ''}${user?.firstName ? ` ${user?.firstName }` : ''}${user?.patronymic ? ` ${user?.patronymic }` : ''}` : ''}`

  }
  static getEmployeeRoleName(role:EmployeeRole) : string {
    switch (role){
      case EmployeeRole.Admin:
        return 'Администратор'
      case EmployeeRole.Owner:
        return 'Владелец'
      case EmployeeRole.ReceivingPointAdmin:
        return 'Администратор пункта приема'
      case EmployeeRole.ReceivingPointManager:
        return 'Менеджер пункта приема'
    }
  }
}
