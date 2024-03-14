import { ReactElement } from 'react'
import styles from './index.module.scss'

interface Props {
  icon: ReactElement
  text: string
}

export default function Item(props: Props) {

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        {props.icon}
        <p>{props.text}</p>
      </div>
    </div>
  )
}
