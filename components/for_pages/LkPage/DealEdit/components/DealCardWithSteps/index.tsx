import CardLayout from '@/components/for_pages/Common/CardLayout'
import styles from './index.module.scss'
import Indicator from '@/components/for_pages/Common/Indicator'
import Info from './Info'



interface Props {
  title: string
  currentStepIndex: number
  onBack?: () => void
}

export default function DealCardWithSteps(props: Props) {

  const texts = [
    { text: 'Открытие сделки' },
    { text: 'Доставка лома' },
    { text: 'Оплата' },
  ]

  return (
    <CardLayout title={props.title} titleClassName={styles.title}>
      <Indicator lineClass={styles.line} className={styles.indicator} step={props.currentStepIndex} options={texts} onBack={props.onBack} />
      <Info
        className={styles.info}
        textTop='Вы приняли предложение покупателя.'
        textBottom='Для открытия сделки с пунктом приёма лома, заполните форму “Оформить сделку”.'
      />
    </CardLayout>
  )
}
