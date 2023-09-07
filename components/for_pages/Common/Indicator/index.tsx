import IndicatorItem from './IndicatorItem'
import styles from './index.module.scss'
import classNames from 'classnames'
import {IOption} from '@/types/types'

interface Props<T> {
  step: number
  options: IOption<T>[]
  onBack?: () => void
  className?: string
  lineClass?: string
  alternate?: boolean
}


export default function Indicator<T>(props: Props<T>) {

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={classNames(styles.line, props.lineClass, props.alternate&&styles.lineAlt)} />
      <div className={styles.texts}>
        {props.options.map((i, index) =>
          <IndicatorItem alternate={props.alternate} onBack={props.onBack} step={props.step} index={index} key={index} label={i.label ?? ''} />
        )}
      </div>
    </div>
  )
}
