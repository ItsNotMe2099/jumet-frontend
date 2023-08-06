import styles from './index.module.scss'
import {IMenuItem} from 'types/types'
import * as React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'

interface Props<T> {
  items: IMenuItem<T>[]
}
function MenuItem<T>(props: {item: IMenuItem<T>}) {
  const isActive = useIsActiveLink(props.item.link ?? '')
  return (<Link
    href={props.item.link ?? '#'}
    className={classNames(styles.item, {
      [styles.active]: isActive
    })}>
    <span>{props.item.name}</span>
  </Link>)
}
export default function MenuHorizontal<T>(props: Props<T>) {

  return (<div className={styles.root}>
    {props.items.map((i, index) => <MenuItem<T> key={index} item={i}/>)}
  </div>)
}
