import styles from './index.module.scss'
import * as React from 'react'
import classNames from 'classnames'
import {colors} from 'styles/variables'
import Link from 'next/link'
import {MouseEventHandler} from 'react'
import ChevronDownSvg from '@/components/svg/ChevronDownSvg'

interface Props {
  title: string
  isOpen?: boolean
  href?: string
  color?: string
  hasChildren?: boolean
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export default function MenuHeader(props: Props) {
  const handleClick: MouseEventHandler = (e) => {
    if(!props.href){
    e.preventDefault()
    e.stopPropagation()
    }
    props.onClick?.()

  }
  const content = (<>
    <div className={styles.label} style={{color: props.color}}>
      {props.title}
    </div>
    {props.hasChildren && <div className={styles.arrow}>
      <ChevronDownSvg color={colors.grey500}/>
    </div>}
  </>)

  const classes = classNames(styles.root, {[styles.opened]: props.isOpen, [styles.active]: props.isActive}, props.className)

  return (<Link href={props.href ?? ''} className={classes} onClick={handleClick}>
    {content}
  </Link>)


}
