import styles from './index.module.scss'
import FilterSwitch from '@/components/for_pages/MainPage/Filter/FilterSwitch'
import { useAppContext } from '@/context/state'

interface Props {
  title: string
  currentStepIndex: number
  children?: React.ReactNode
}


export default function RegLayout(props: Props) {

  const appContext = useAppContext()

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.title}>
            {props.title}
          </div>
          {props.currentStepIndex === 0 ? <FilterSwitch
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
