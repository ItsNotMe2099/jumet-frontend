import styles from './index.module.scss'
import {IMenuItem} from 'types/types'
import * as React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'
import {MouseEventHandler} from 'react'

interface Props<T> {
  items: IMenuItem<T>[]
  onClick: (data: IMenuItem<T>) => void
}
function MenuItem<T>(props: {item: IMenuItem<T>,   onClick: () => void}) {
  const isActive = useIsActiveLink(props.item.link ?? '')
  const handleClick: MouseEventHandler = (e) => {
    if(!props.item.link) {
      e.preventDefault()
      e.stopPropagation()
    }
    props.onClick?.()
  }
  return (<Link
    href={props.item.link ?? '#'}
    onClick={handleClick}
    className={classNames(styles.item, {
      [styles.active]: isActive
    })}>
    <span>{props.item.name}</span>
  </Link>)
}
export default function MenuHorizontal<T>(props: Props<T>) {

  return (<div className={styles.root}>
    {props.items.map((i, index) => <MenuItem<T> key={index} item={i} onClick={() => props.onClick(i)}/>)}
  </div>)
}
