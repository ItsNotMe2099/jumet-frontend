import ColSvg from '@/components/svg/ColSvg'
import styles from './index.module.scss'
import classNames from 'classnames'
import CheckSvg from '@/components/svg/CheckSvg'
import { colors } from '@/styles/variables'


interface Props {
  step: number
  label: string
  index: number
  onBack?: () => void
  alternate?: boolean
}


export default function IndicatorItem(props: Props) {

  const handleBack = () => {
    if (props.index === props.step - 1) {
      props.onBack ? props.onBack() : null
    }
  }

  return (
    <div className={classNames(styles.root, {[styles.onBack]: props.index === props.step - 1}, props.alternate&&styles.rootAlt)} onClick={handleBack}>
      {props.step > props.index ? <CheckSvg className={styles.check} color={colors.blue500} />
        :       
        <ColSvg className={styles.col} step={props.step} index={props.index} />
      }
      <div className={classNames(styles.text, { [styles.active]: props.step === props.index }, props.alternate&&styles.textAlt)}>
        {props.label}
      </div>
    </div>
  )
}
