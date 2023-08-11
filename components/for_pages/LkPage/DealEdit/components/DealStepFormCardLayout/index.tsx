import styles from './index.module.scss'
import * as React from 'react'
import {ReactElement} from 'react'

interface Props{
  children: ReactElement | ReactElement[]
  title: string
}
export default function DealStepFormCardLayout(props: Props) {
  return <div className={styles.root}>
    <div className={styles.title}>{props.title}</div>
    <div className={styles.wrapper}>
    <div className={styles.content}>{props.children}</div>
    </div>
  </div>
}
