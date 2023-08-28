import styles from './index.module.scss'
import * as React from 'react'
import {ReactElement} from 'react'
import classNames from 'classnames'

interface Props{
  children: ReactElement | ReactElement[]
  contentClassName?: string
  title: string
}
export default function DealStepFormCardLayout(props: Props) {
  return <div className={styles.root}>
    <div className={styles.title}>{props.title}</div>
    <div className={styles.wrapper}>
    <div className={classNames(styles.content, props.contentClassName)}>{props.children}</div>
    </div>
  </div>
}
