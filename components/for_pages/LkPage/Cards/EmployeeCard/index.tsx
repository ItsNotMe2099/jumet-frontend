import IUser from '@/data/interfaces/IUser'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'


interface Props {
  user: IUser
  titleClassName?: string
  cardLayoutClassName?: string
}

export default function EmployeeCard(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.name}>{props.user.firstName}</div>
        <div className={styles.email}>{props.user.email}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.label}>Пункт приёма: </div><div className={styles.value}>г. Сергиев Посад, ул. Зои Космодемьянской, 32</div>
      </div>
      <Button className={styles.btn} color='grey' styleType='large' icon={<ChatSvg color={colors.blue500} />}>
        Чаты сотрудника
      </Button>
    </div>
  )
}
