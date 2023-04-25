import ColSvg from '@/components/svg/ColSvg'
import styles from './index.module.scss'
import classNames from 'classnames'

interface IOption {
  text: string
}

interface Props {
  step: number
  option: IOption
  index: number
}


export default function Item(props: Props) {

  return (
    <div className={styles.root}>
      <ColSvg className={styles.col} step={props.step} index={props.index + 1} />
      <div className={classNames(styles.text, { [styles.active]: props.step === props.index + 1 })}>
        {props.option.text}
      </div>
    </div>
  )
}
