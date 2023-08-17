//import styles from './index.module.scss'
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
      },
    },
  };

  const labels = ['26.09 00:00', '26.09 00:00', '26.09 00:00', '26.09 00:00', '26.09 00:00', '26.09 00:00', '26.09 00:00',]

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [0, 50],
        borderColor: colors.blue500,
        backgroundColor: colors.blue500,
      },
      {
        label: 'Dataset 2',
        data: [0, 20],
        borderColor: colors.blue300,
        backgroundColor: colors.blue300,
      },
    ],
  };

  return (
    <CardLayout title={props.title}>
      <Line options={options} data={data} />
    </CardLayout>
  )
}
