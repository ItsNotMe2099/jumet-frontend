import styles from 'components/for_pages/Common/MenuVertical/MenuItem/index.module.scss'
import * as React from 'react'
import Link from 'next/link'

import classNames from 'classnames'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'


interface Props {
  title: string
  link?: string,
  onClick: () => void,
  className?: string
}

export const MenuItem = (props: Props) => {
  const isActive = useIsActiveLink(props.link ?? '')
  return (
    <Link
      href={props.link ?? '#'}
      className={classNames(styles.root, {[styles.active]: isActive}, props.className)} onClick={props.onClick}>
      <div className={classNames(styles.title)}>
       {props.title}
      </div>
    </Link>
  )
}
