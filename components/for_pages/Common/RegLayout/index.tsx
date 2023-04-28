import styles from './index.module.scss'
import FilterSwitch from '@/components/for_pages/MainPage/Filter/FilterSwitch'
import { useAppContext } from '@/context/state'
import Indicator from '../../RegFillPage/Indicator'

interface Props {
  title: string
  currentStepIndex?: number
  children?: React.ReactNode
}


export default function RegLayout(props: Props) {

  const appContext = useAppContext()

  const texts = [
    { text: 'Данные о компании' },
    { text: 'Зоны доставки' },
    { text: 'Цены на лом' },
    { text: 'Сотрудники' },
    { text: 'Режим работы и фото' }
  ]

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {props.currentStepIndex && props.currentStepIndex > 0 ?
          <Indicator step={props.currentStepIndex} options={texts} />
          : null
        }
        <div className={styles.container}>
          <div className={styles.title}>
            {props.title}
          </div>
          {props.currentStepIndex === 0 || !props.currentStepIndex ? <FilterSwitch
            text1='Продавец лома'
            text2='Ломозаготовитель'
            className={styles.switch}
            onClick={(active) => appContext.switchRegMode(active)}
            active={appContext.regMode} /> : null}
          {props.children}
        </div>
      </div>
    </div>
  )
}
