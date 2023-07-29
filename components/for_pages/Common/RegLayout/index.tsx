import styles from './index.module.scss'

import Indicator from '../Indicator'
import { useRouter } from 'next/router'

interface Props {
  title: string
  currentStepIndex: number
  children?: React.ReactNode
  indicator?: boolean
  onBack?: () => void
  filter?: boolean
}


export default function RegLayout(props: Props) {

  const texts = [
    { text: 'Данные о компании' },
    { text: 'Зоны доставки' },
    { text: 'Цены на лом' },
    { text: 'Сотрудники' },
    { text: 'Режим работы и фото' }
  ]

  const router = useRouter()

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {props.indicator || props.filter ?
          <Indicator step={props.currentStepIndex} options={texts} onBack={props.onBack} />
          : null
        }
        <div className={styles.container}>
          <div className={styles.title}>
            {props.title}
          </div>

          {props.children}
        </div>
      </div>
    </div>
  )
}

RegLayout.defaultProps = {
  filter: true
}
