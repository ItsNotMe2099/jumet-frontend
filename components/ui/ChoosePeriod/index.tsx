import CalendarSvg from '@/components/svg/CalendarSvg'
import styles from './index.module.scss'
import classNames from 'classnames'
import { colors } from '@/styles/variables'


interface Props {
  className?: string
}

export default function ChoosePeriod(props: Props) {
  return (
    <div className={classNames(styles.root, props.className)}>
      <CalendarSvg color={colors.dark400} />
      <div className={styles.text}>
        Выбрать период
      </div>
    </div>
  )
}
