import styles from './index.module.scss'
import {colors} from 'styles/variables'
import ChevronLeftSvg from '@/components/svg/ChevronLeftSvg'
import {ReactElement} from 'react'
import Link from 'next/link'

export interface Props {
  children: ReactElement | ReactElement[] | string | null
  onClick: () => void
  href?: string | null
}

export default function BackButton(props: Props) {

  const content = (<> <ChevronLeftSvg color={colors.grey500}/>
    <div className={styles.text}>{props.children}</div>
  </>)
  if (props.href) {
    return <Link className={styles.root} href={props.href}>{content}</Link>
  }
  return (
    <div className={styles.root} onClick={props.onClick}>
      {content}
    </div>
  )
}

