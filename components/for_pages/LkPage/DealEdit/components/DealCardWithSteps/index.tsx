import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import Indicator from '@/components/for_pages/Common/Indicator'
import Info from './Info'
import {IOption} from '@/types/types'



interface Props {
  title: string
  currentStepIndex: number
  onBack?: () => void
}

export default function DealCardWithSteps(props: Props) {

  const options: IOption<number>[] = [
    { label: 'Открытие сделки', value: 1 },
    { label: 'Доставка лома', value: 2 },
    { label: 'Оплата', value: 2 },
  ]

  return (
    <CardLayout title={props.title} titleClassName={styles.title}>
      <Indicator<number> lineClass={styles.line} className={styles.indicator} step={props.currentStepIndex} options={options} onBack={props.onBack} />
      <Info
        className={styles.info}
        textTop='Вы приняли предложение покупателя.'
        textBottom='Для открытия сделки с пунктом приёма лома, заполните форму “Оформить сделку”.'
      />
    </CardLayout>
  )
}
