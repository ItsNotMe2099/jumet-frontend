import IUser from '@/data/interfaces/IUser'

export default class UserUtils {
  static getName(user: IUser | null): string {
    if (!user) {
      return ''
    }
    return `${user?.firstName ?? ''} ${user?.lastName ?? ''}`
  }
}
