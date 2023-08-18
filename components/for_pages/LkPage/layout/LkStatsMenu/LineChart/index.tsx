import styles from './index.module.scss'
import { colors } from '@/styles/variables'
import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import CardLayout from '@/components/for_pages/Common/CardLayout'
import ColoredCircleSvg from '@/components/svg/ColoredCircleSvg'
import Button from '@/components/ui/Button'
import HiddenXs from '@/components/visibility/HiddenXs'
import ReloadSvg from '@/components/svg/ReloadSvg'
import VisibleXs from '@/components/visibility/VisibleXs'

interface Props {
  className?: string
  title?: string
}

export default function LineChart(props: Props) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    }
  }

  const labels = ['26.09 00:00', '26.09 00:00', '26.09 00:00', '26.09 00:00', '26.09 00:00', '26.09 00:00', '26.09 00:00',]

  const data = {
    labels,
    datasets: [
      {
        label: '',
        data: [10, 50, 20,],
        borderColor: colors.blue500,
        backgroundColor: colors.blue500,
      },
      {
        label: '',
        data: [10, 20],
        borderColor: colors.blue300,
        backgroundColor: colors.blue300,
      },
    ],
  }

  return (
    <CardLayout topClassName={styles.top} title={props.title} additionalEl=
      {<HiddenXs><Button styleType='large' color='grey' icon={<ReloadSvg color={colors.blue500} />}>Обновлено в 13:01</Button></HiddenXs>}>
      <Line className={styles.line} options={options} data={data} />
      <div className={styles.legend}>
        <div className={styles.item}>
          <ColoredCircleSvg color={colors.blue500} />
          <div className={styles.text}>За выбранный период</div>
          <div className={styles.number}>{data.datasets[0].data[1]}</div>
        </div>
        <div className={styles.item}>
          <ColoredCircleSvg color={colors.blue300} />
          <div className={styles.text}>За предыдущий период</div>
          <div className={styles.number}>{data.datasets[1].data[1]}</div>
        </div>
      </div>
      <VisibleXs><Button className={styles.mobile} styleType='large' color='grey' icon={<ReloadSvg color={colors.blue500} />}>Обновлено в 13:01</Button></VisibleXs>
    </CardLayout>
  )
}
