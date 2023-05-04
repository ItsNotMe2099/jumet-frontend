import styles from './index.module.scss'
import FilterSwitch from '@/components/for_pages/MainPage/Filter/FilterSwitch'
import { useState } from 'react'
import { SwitchState } from '@/data/enum/SwitchState'
import Indicator from '../Indicator'

interface Props {
  title: string
  currentStepIndex: number
  children?: React.ReactNode
  indicator?: boolean
  active?: SwitchState
  onClick?: (active: SwitchState) => void
}


export default function RegLayout(props: Props) {

  const texts = [
    { text: 'Данные о компании' },
    { text: 'Зоны доставки' },
    { text: 'Цены на лом' },
    { text: 'Сотрудники' },
    { text: 'Режим работы и фото' }
  ]

  const [active, setActive] = useState<SwitchState>(props.active ? props.active : SwitchState.Secondoption)

  const handleClick = (active: SwitchState) => {
    setActive(active)
    props.onClick ? props.onClick(active) : null
  }

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {props.indicator ?
          <Indicator step={props.currentStepIndex} options={texts} />
          : null
        }
        <div className={styles.container}>
          <div className={styles.title}>
            {props.title}
          </div>
          {!props.indicator ? <FilterSwitch
            text1='Продавец лома'
            text2='Ломозаготовитель'
            className={styles.switch}
            onClick={handleClick}
            active={active} /> : null}
          {props.children}
        </div>
      </div>
    </div>
  )
}
