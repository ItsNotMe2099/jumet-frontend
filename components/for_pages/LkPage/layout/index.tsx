import {useAppContext} from '@/context/state'
import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'


interface Props {
  children: React.ReactNode
  title: string
  actions?: ReactElement | ReactElement[] | null
  menu: ReactElement
  className?: string
}

export default function LkLayout(props: Props) {
  const appContext = useAppContext()
  const actions = props.actions ? (<div className={styles.actions}>{props.actions}</div>) : null
  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={styles.title}>
        {props.title}
        {appContext.isDesktop && actions}

      </div>
      <div className={styles.container}>
        <div className={styles.menu}>
          {props.menu}
        </div>

        {appContext.isMobile && actions}
        <div className={styles.content}>
          {props.children}
        </div>
      </div>
    </div>
  )
}
