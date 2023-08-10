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
}


export default function Indicator<T>(props: Props<T>) {

  return (
    <div className={classNames(styles.root, props.className)}>
        <div className={classNames(styles.line, props.lineClass)} />
        <div className={styles.texts}>
          {props.options.map((i, index) =>
            <IndicatorItem onBack={props.onBack} step={props.step} index={index} key={index} label={i.label ?? ''} />
          )}
        </div>
    </div>
  )
}
