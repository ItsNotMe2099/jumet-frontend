import DotSvg from '@/components/svg/DotSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import { useAppContext } from '@/context/state'
import { UserRole } from '@/data/enum/UserRole'

interface Props {
  address?: string | null | undefined
}

export default function ChatHeader(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.title}>
          {props.address && appContext.aboutMe?.role === UserRole.Seller ?
            <><span>Пункт приёма:</span><>{props.address}</></>
            : appContext.aboutMe?.role === UserRole.Seller ? 'Чат с пунктом приёма' : 'Чат с продавцом'}
        </div>
        <div className={styles.status}>
          <DotSvg color={colors.green600} />
          <div className={styles.text}>
            Онлайн
          </div>
        </div>
      </div>
      <div className={styles.separator} />
    </div>
  )
}
