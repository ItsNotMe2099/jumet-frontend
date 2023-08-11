import styles from './index.module.scss'
import classNames from 'classnames'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { colors } from '@/styles/variables'
import ColoredCircleSvg from '@/components/svg/ColoredCircleSvg'

interface Props {
  className?: string
  total: number
  completed: number
  canceled: number
  inProgress: number
  totalCost: number
  completedCost: number
  canceledCost: number
  inProgressCost: number
}

export default function Donut(props: Props) {

  ChartJS.register(ArcElement, Tooltip, Legend)

  const data = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [props.canceled, props.completed, props.inProgress],
        backgroundColor: [
          colors.red500,
          colors.green600,
          colors.yellow500,
        ],
      },
    ],
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.doughnut}>
        <Doughnut data={data} width={220} height={220} />
        <div className={styles.total}>
          <div className={styles.number}>
            {props.total}
          </div>
          <div className={styles.text}>
            Всего сделок
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.total}>
          <div className={styles.label}>Всего сделок</div>
          <div className={styles.numbers}>
            <div className={styles.number}>
              {props.total} (100%)
            </div>
            <div className={styles.cost}>
              {props.totalCost} ₽
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <ColoredCircleSvg color={colors.green600} />
            <div className={styles.text}>Завершенных сделок</div>
          </div>
          <div className={styles.numbers}>
            <div className={styles.number}>
              {props.completed} ({Math.round((props.completed / props.total) * 100)}%)
            </div>
            <div className={styles.cost}>
              {props.completedCost} ₽
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <ColoredCircleSvg color={colors.yellow500} />
            <div className={styles.text}>Сделок в работе</div></div>
          <div className={styles.numbers}>
            <div className={styles.number}>
              {props.inProgress} ({Math.round((props.inProgress / props.total) * 100)}%)
            </div>
            <div className={styles.cost}>
              {props.inProgressCost} ₽
            </div>
          </div>
        </div>
        <div className={styles.item}>
          <div className={styles.label}>
            <ColoredCircleSvg color={colors.red500} />
            <div className={styles.text}>Отмененных сделок</div></div>
          <div className={styles.numbers}>
            <div className={styles.number}>
              {props.canceled} ({Math.round((props.canceled / props.total) * 100)}%)
            </div>
            <div className={styles.cost}>
              {props.canceledCost} ₽
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}
