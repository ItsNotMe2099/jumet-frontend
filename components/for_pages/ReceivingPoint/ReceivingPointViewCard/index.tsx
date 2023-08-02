import styles from './index.module.scss'
import React, {ReactElement} from 'react'
import ReceivingPointInfoCardLayout from '@/components/for_pages/Common/ReceivingPointInfoCardLayout'

interface Props {
  title?: string | ReactElement | null
  children?: ReactElement | ReactElement[]
}

export default function ReceivingPointViewCard(props: Props) {
   return (
    <ReceivingPointInfoCardLayout
      className={styles.root}
      actions={[]}
      title={props.title}>
      {props.children}
    </ReceivingPointInfoCardLayout>
  )
}
