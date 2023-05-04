import Item from './Item'
import styles from './index.module.scss'
import IndicatorLineSvg from '@/components/svg/IndicatorLineSvg'

interface IOption {
  text: string
}

interface Props {
  step: number
  options: IOption[]
}


export default function Indicator(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <IndicatorLineSvg className={styles.line} />
        <div className={styles.texts}>
          {props.options.map((i, index) =>
            <Item step={props.step} index={index} key={index} option={i} />
          )}
        </div>
      </div>
    </div>
  )
}
