import StarSvg from '@/components/svg/StarSvg'
import styles from './index.module.scss'
import { colors } from '@/styles/variables'


interface Props {
  rating: number
}

export default function Rating(props: Props) {

  return (
    <div className={styles.rating}>
      <StarSvg color={colors.yellow500} />
      <div className={styles.number}>{props.rating}</div>
    </div>
  )
}