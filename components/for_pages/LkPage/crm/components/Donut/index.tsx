import styles from '@/components/for_pages/LkPage/crm/components/Donut/index.module.scss'
import classNames from 'classnames'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import ColoredCircleSvg from '@/components/svg/ColoredCircleSvg'
import Formatter from '@/utils/formatter'
import {ChartData, DefaultDataPoint} from 'chart.js/dist/types'

interface Props {
  className?: string
  total: number
  labelTotal: string
  totals: {label: string, count: number, amount: number, percent: number}
  values: {label: string, count: number, amount: number, percent?: number, color: string}[]
}

export default function Donut(props: Props) {

  ChartJS.register(ArcElement, Tooltip, Legend)
 const data: ChartData<'doughnut', DefaultDataPoint<'doughnut'>, string> = {
    labels: [],
    datasets: [
      {
        label: '',
        data: props.values.map(i => i.percent ?? i.count ? Math.round((i.count / props.totals.count) * 100) : 0),
        backgroundColor: props.values.map(i => i.color),
      },
    ],
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.doughnut}>
        <Doughnut<DefaultDataPoint<'doughnut'>, string> data={data as any} width={220} height={220} />
        <div className={styles.total}>
          <div className={styles.number}>
            {props.total}
          </div>
          <div className={styles.text}>
            {props.labelTotal}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.total}>
          <div className={styles.label}>{props.totals.label}</div>
          <div className={styles.numbers}>
            <div className={styles.number}>
              {props.totals.count} (100%)
            </div>
            <div className={styles.cost}>
              {Formatter.formatPrice(props.totals.amount)}
            </div>
          </div>
        </div>
        {props.values.map((i) => <div className={styles.item}>
          <div className={styles.label}>
            <ColoredCircleSvg color={i.color} />
            <div className={styles.text}>{i.label}</div>
          </div>
          <div className={styles.numbers}>
            <div className={styles.number}>
              {i.count} ({i.percent ?? i.count ? Math.round((i.count / props.totals.count) * 100) : 0}%)
            </div>
            <div className={styles.cost}>
              {Formatter.formatPrice(i.amount)}
            </div>
          </div>
        </div>)}
      </div>
    </div >
  )
}
