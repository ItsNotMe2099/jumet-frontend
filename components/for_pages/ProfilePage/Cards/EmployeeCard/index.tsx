import IUser from '@/data/interfaces/IUser'
import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'


interface Props {
  user: IUser
}

export default function EmployeeCard(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.firstRow}>
        <div className={styles.name}>{props.user.name}</div>
        <div className={styles.email}>{props.user.email}</div>
      </div>
      <div className={styles.secondRaw}>
        <span>Пункт приёма: </span>г. Сергиев Посад, ул. Зои Космодемьянской, 32
      </div>
      <Button className={styles.btn} color='grey' styleType='large' icon={<ChatSvg color={colors.blue500} />}>
        Чаты сотрудника
      </Button>
    </div>
  )
}
