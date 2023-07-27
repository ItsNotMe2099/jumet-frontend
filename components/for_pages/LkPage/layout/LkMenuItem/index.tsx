import styles from './index.module.scss'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import Link from 'next/link'
import usePressAndHover from '@/components/hooks/usePressAndHover'
import useIsActiveLink from '@/components/hooks/useIsActiveLink'
import {MouseEventHandler} from 'react'


interface Props {
  children: string
  href?: string | undefined
  onClick?: (() => void) | null
}

export default function LkMenuItem(props: Props) {
  const [ref, press, hover] = usePressAndHover()
  const active = useIsActiveLink(props.href ?? '')

  const router = useRouter()
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
    props.onClick?.()
  }
  return (
    <Link
      href={props.href ?? ''}
      onClick={handleClick}
      className={classNames(styles.root, {
        [styles.root]: true,
        [styles.press]: press,
        [styles.hover]: hover,
        [styles.active]: active,
      })}>
      <span className={styles.text}>{props.children}</span>
    </Link>

  )
}
