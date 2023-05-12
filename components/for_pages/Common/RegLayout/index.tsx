import styles from './index.module.scss'
import FilterSwitch from '@/components/for_pages/MainPage/Filter/FilterSwitch'
import { useState } from 'react'
import { SwitchState } from '@/data/enum/SwitchState'
import Indicator from '../Indicator'
import { useRouter } from 'next/router'

interface Props {
  title: string
  currentStepIndex: number
  children?: React.ReactNode
  indicator?: boolean
  active?: SwitchState
  onClick?: (active: SwitchState) => void
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

  const [active, setActive] = useState<SwitchState>(props.active ? props.active : SwitchState.Secondoption)

  const handleClick = (active: SwitchState) => {
    setActive(active)
    props.onClick ? props.onClick(active) : null
  }

  const router = useRouter()

  console.log(router)

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
          {(!props.indicator) ? (
            <FilterSwitch
              text1='Продавец лома'
              text2='Ломозаготовитель'
              className={styles.switch}
              onClick={handleClick}
              active={active}
            />
          ) : null}
          {props.children}
        </div>
      </div>
    </div>
  )
}

RegLayout.defaultProps = {
  filter: true
}
