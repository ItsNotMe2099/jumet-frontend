import styles from 'components/for_pages/Common/ReceivingPointInfoCardLayout/index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import VisibleXs from '@/components/visibility/VisibleXs'
import HiddenXs from '@/components/visibility/HiddenXs'

interface Props {
  children: React.ReactNode
  className?: string
  title?: string | ReactElement | null
  actions: ReactElement[]
}

export default function ReceivingPointInfoCardLayout(props: Props) {

  const actions = ((props.actions ?? []).length > 0 ? <div className={classNames(styles.actions)}>{props.actions}</div> : null)
  return (
    <div className={classNames(styles.root, props.className)}>
      <div className={classNames(styles.header)}>
        <div className={classNames(styles.title)}>
          {props.title}
        </div>
        <HiddenXs>
          {actions}
        </HiddenXs>
       </div>
      <div className={styles.body}>
        {props.children}
      </div>
      <VisibleXs>
        {actions}
      </VisibleXs>
    </div>
  )
}
