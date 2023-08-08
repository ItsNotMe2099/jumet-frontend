import Item from './Item'
import styles from './index.module.scss'
import classNames from 'classnames'

interface IOption {
  text: string
}

interface Props {
  step: number
  options: IOption[]
  onBack?: () => void
  className?: string
  lineClass?: string
}


export default function Indicator(props: Props) {

  return (
    <div className={classNames(styles.root, props.className)}>
        <div className={classNames(styles.line, props.lineClass)} />
        <div className={styles.texts}>
          {props.options.map((i, index) =>
            <Item onBack={props.onBack} step={props.step} index={index} key={index} option={i} />
          )}
        </div>
    </div>
  )
}
