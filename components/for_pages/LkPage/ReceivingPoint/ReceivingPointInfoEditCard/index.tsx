import styles from './index.module.scss'
import React, {ReactElement} from 'react'
import EditButton from '@/components/ui/Buttons/EditButton'
import ReceivingPointInfoCardLayout from '@/components/for_pages/Common/ReceivingPointInfoCardLayout'
import {DeepPartial, IFormStepProps, IReceivingPointInfoEditCardProps} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import {useAppContext} from '@/context/state'

interface Props extends IReceivingPointInfoEditCardProps{
  children: ReactElement | ReactElement[] | null
  form?: ReactElement<IFormStepProps<DeepPartial<IReceivingPoint>>> | null
  editButton?: ReactElement
  title: string
}

export default function ReceivingPointInfoEditCard(props: Props) {
  const appContext = useAppContext()
  const editButton = props.editButton ?? <EditButton fluid={appContext.isMobile} onClick={() =>  props.onSetIsEdit?.(true)}/>
  return (
    <ReceivingPointInfoCardLayout
      className={styles.root}
      actions={!props.isEdit ? [editButton] : []}
      title={props.title}>
      {props.isEdit ? props.form : props.children}
    </ReceivingPointInfoCardLayout>
  )
}
