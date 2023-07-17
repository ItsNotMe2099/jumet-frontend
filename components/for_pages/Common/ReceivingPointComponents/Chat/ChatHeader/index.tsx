import DotSvg from '@/components/svg/DotSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'

interface Props {

}

export default function ChatHeader(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.title}>
          Чат с пунктом приёма
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