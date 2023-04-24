import ListSvg from '@/components/svg/ListSvg'
import styles from './index.module.scss'
import classNames from 'classnames'
import { colors } from '@/styles/variables'
import { useState } from 'react'
import MapSvg from '@/components/svg/MapSvg'
import { SwitchState } from '@/data/enum/SwitchState'


interface Props {
  active: SwitchState
  onClick: (active: SwitchState) => void
  className?: string
  withIcon?: boolean
  text1: string
  text2: string
}

export default function FilterSwitch(props: Props) {

  const [active, setActive] = useState<SwitchState>(props.active)

  const handleClick = (active: SwitchState) => {
    setActive(active)
    props.onClick(active)
  }

  return (
    <div className={classNames(styles.root, props.className)}>
      <div onClick={() => handleClick(SwitchState.FirstOption)} className={classNames(styles.item, { [styles.active]: active === SwitchState.FirstOption })}>
        {props.withIcon ? <ListSvg color={active === SwitchState.FirstOption ? colors.blue500 : colors.dark500} /> : null}
        <div className={styles.text}>
          {props.text1}
        </div>
      </div>
      <div onClick={() => handleClick(SwitchState.Secondoption)} className={classNames(styles.item, { [styles.active]: active === SwitchState.Secondoption })}>
        {props.withIcon ? <MapSvg color={active === SwitchState.Secondoption ? colors.blue500 : colors.dark500} /> : null}
        <div className={styles.text}>
          {props.text2}
        </div>
      </div>
    </div>
  )
}
