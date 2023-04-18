import ListSvg from '@/components/svg/ListSvg'
import styles from './index.module.scss'
import classNames from 'classnames'
import { colors } from '@/styles/variables'
import { useState } from 'react'
import MapSvg from '@/components/svg/MapSvg'


interface Props {
  active: 'list' | 'map'
  onClick: (active: 'list' | 'map') => void
}

export default function FilterListMap(props: Props) {

  const [active, setActive] = useState<'list' | 'map'>('list')

  const handleClick = (active: 'list' | 'map') => {
    setActive(active)
    props.onClick(active)
  }

  return (
    <div className={styles.root}>
      <div onClick={() => handleClick('list')} className={classNames(styles.item, { [styles.active]: active === 'list' })}>
        <ListSvg color={active === 'list' ? colors.blue500 : colors.dark500} />
        <div className={styles.text}>
          Списком
        </div>
      </div>
      <div onClick={() => handleClick('map')} className={classNames(styles.item, { [styles.active]: active === 'map' })}>
        <MapSvg color={active === 'map' ? colors.blue500 : colors.dark500} />
        <div className={styles.text}>
          На карте
        </div>
      </div>
    </div>
  )
}
