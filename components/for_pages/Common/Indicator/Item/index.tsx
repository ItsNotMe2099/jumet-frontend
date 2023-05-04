import ColSvg from '@/components/svg/ColSvg'
import styles from './index.module.scss'
import classNames from 'classnames'
import CheckSvg from '@/components/svg/CheckSvg'
import { colors } from '@/styles/variables'

interface IOption {
  text: string
}

interface Props {
  step: number
  option: IOption
  index: number
  onBack?: () => void
}


export default function Item(props: Props) {

  const handleBack = () => {
    if (props.index === props.step - 1) {
      props.onBack ? props.onBack() : null
    }
  }

  return (
    <div className={classNames(styles.root, {[styles.onBack]: props.index === props.step - 1})} onClick={handleBack}>
      {props.step > props.index ? <CheckSvg className={styles.check} color={colors.blue500} />
        :
        <ColSvg className={styles.col} step={props.step} index={props.index} />}
      <div className={classNames(styles.text, { [styles.active]: props.step === props.index })}>
        {props.option.text}
      </div>
    </div>
  )
}
