import styles from './index.module.scss'
import * as React from 'react'
import Link from 'next/link'

import classNames from 'classnames'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'


interface Props {
  title: string
  link?: string,
  onClick: () => void,
}

export const MenuItem = (props: Props) => {
  const isActive = useIsActiveLink(props.link ?? '')
  return (
    <Link
      href={props.link ?? '#'}
      className={classNames(styles.root, {[styles.active]: isActive})} onClick={props.onClick}>
      <div className={styles.title}>
        {props.title}
      </div>
    </Link>
  )
}
