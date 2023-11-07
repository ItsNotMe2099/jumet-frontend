import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import ChatSvg from '@/components/svg/ChatSvg'
import { colors } from '@/styles/variables'
import {IReceivingPointUser} from '@/data/interfaces/IReceivingPointUser'
import UserUtils from '@/utils/UserUtils'
import classNames from 'classnames'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments, UserFormModalArguments} from '@/types/modal_arguments'
import {ReactElement, useState} from 'react'
import {IOption, RequestError} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import ReceivingPointUserRepository from '@/data/repositories/ReceivingPointUserRepository'
import EditButton from '@/components/ui/Buttons/EditButton'
import DeleteButton from '@/components/ui/Buttons/DeleteButton'
import StatusBadge from '@/components/ui/StatusBadge'
import {ReceivingPointUserStatus} from '@/data/enum/ReceivingPointUserStatus'


interface FieldProps{
  item: IOption<number | string | ReactElement>
}
function Field(props: FieldProps) {
  return (<div className={styles.field}>
    <div className={styles.label}>
      {props.item.label}
    </div>
    <div className={styles.value}>
      {props.item.value}
    </div>
  </div>)
}
interface Props {
  user: IReceivingPointUser
  isLargeName?: boolean | undefined
  receivingPoint?: IReceivingPoint | null
}

export default function EmployeeCard(props: Props) {
  const appContext = useAppContext()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const handleDelete = () => {
    appContext.showModal(ModalType.Confirm, {
      title: 'Удалить сотрудника?',
      text: `Вы уверены что хотите удалить сотрудника из пункта приема ${props.receivingPoint?.name}?`,
      onConfirm: async () => {
        try {
          appContext.hideModal()
          setDeleteLoading(true)
          const res = await ReceivingPointUserRepository.delete(props.user.id)
          setDeleteLoading(false)
          appContext.receivingPointUserDeleteState$.next(props.user)
         } catch (err) {
          if (err instanceof RequestError) {
            appContext.showSnackbar(err.message, SnackbarType.error)
          }
          setDeleteLoading(false)
        }
      }
    } as ConfirmModalArguments)
  }
  const handleEdit = () => {
   appContext.showModal(ModalType.UserForm, {receivingPointUser: props.user, user: props.user.user} as UserFormModalArguments)
  }
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
        <div className={classNames(styles.name, {[styles.large]: props.isLargeName})}>{props.user?.user ? UserUtils.getName(props.user.user) : props.user.name}</div>
        <StatusBadge<ReceivingPointUserStatus> data={{
          [ReceivingPointUserStatus.Created]: {label: 'Приглашение отправлено', color: 'green'},
          [ReceivingPointUserStatus.Sent]: {label: 'Приглашение отправлено', color: 'green'},
          [ReceivingPointUserStatus.Confirmed]: {label: 'Зарегистрирован', color: 'blue'},
        }} value={props.user.status}/>
        </div>
        <div className={styles.email}>{props.user.email}</div>
      </div>
      {/*<div className={styles.field}>
        <div className={styles.label}>Пункт приёма: </div><div className={styles.value}>г. Сергиев Посад, ул. Зои Космодемьянской, 32</div>
      </div>*/}
      <Field item={{label: 'Роль', value: UserUtils.getEmployeeRoleName(props.user.user?.employeeRole ?? props.user.initialRole)}}/>
      <div>
        <div className={styles.controls}>
          <EditButton onClick={handleEdit}/>
            <DeleteButton onClick={handleDelete}/>
            <div className={styles.controlsSeparator}></div>
          <Button color='grey' styleType='large' icon={<ChatSvg color={colors.blue500} />}>
            Чаты сотрудника
          </Button>
        </div>
      </div>
    </div>
  )
}
