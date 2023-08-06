import styles from './index.module.scss'

import Indicator from '../Indicator'
import { useRouter } from 'next/router'
import classNames from 'classnames'

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
    { text: 'Доставка' },
    { text: 'Цены на лом' },
    { text: 'Сотрудники' },
    { text: 'Режим работы и фото' }
  ]

  const router = useRouter()

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {props.indicator || props.filter &&   <div className={classNames(styles.wrapper, styles.wrapperIndicator)}>
          <div className={styles.indicator}>
            <Indicator step={props.currentStepIndex} options={texts} onBack={props.onBack} /></div></div>
        }
        <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title}>
            {props.title}
          </div>

          {props.children}
        </div>
        </div>
      </div>
    </div>
  )
}

RegLayout.defaultProps = {
  filter: true
}
