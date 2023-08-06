import Item from './Item'
import styles from './index.module.scss'

interface IOption {
  text: string
}

interface Props {
  step: number
  options: IOption[]
  onBack?: () => void
}


export default function Indicator(props: Props) {

  return (
    <div className={styles.root}>
        <div className={styles.line} />
        <div className={styles.texts}>
          {props.options.map((i, index) =>
            <Item onBack={props.onBack} step={props.step} index={index} key={index} option={i} />
          )}
        </div>
    </div>
  )
}
