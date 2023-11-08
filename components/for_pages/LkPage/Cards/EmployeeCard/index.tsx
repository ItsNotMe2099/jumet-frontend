import styles from './index.module.scss'
import Button from '@/components/ui/Button'
import ChatSvg from '@/components/svg/ChatSvg'
import {colors} from '@/styles/variables'
import UserUtils from '@/utils/UserUtils'
import classNames from 'classnames'
import {useAppContext} from '@/context/state'
import {ModalType, SnackbarType} from '@/types/enums'
import {ConfirmModalArguments, EmployeeFormModalArguments} from '@/types/modal_arguments'
import {ReactElement, useState} from 'react'
import {IOption, RequestError} from '@/types/types'
import {IReceivingPoint} from '@/data/interfaces/IReceivingPoint'
import EditButton from '@/components/ui/Buttons/EditButton'
import DeleteButton from '@/components/ui/Buttons/DeleteButton'
import StatusBadge from '@/components/ui/StatusBadge'
import {ReceivingPointUserStatus} from '@/data/enum/ReceivingPointUserStatus'
import EmployeeRepository from '@/data/repositories/EmployeeRepository'
import IEmployee from '@/data/interfaces/IEmployee'


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
  employee: IEmployee
  isLargeName?: boolean | undefined
  receivingPoint?: IReceivingPoint | null
}

export default function EmployeeCard(props: Props) {
  const appContext = useAppContext()
  const [deleteLoading, setDeleteLoading] = useState(false)
  const handleDelete = () => {
    appContext.showModal(ModalType.Confirm, {
      title: 'Удалить сотрудника?',
      text: props.receivingPoint ? `Вы уверены что хотите удалить сотрудника из пункта приема ${props.receivingPoint?.name}?` : 'Вы уверены что хотите удалить сотрудника?',
      onConfirm: async () => {
        try {
          appContext.hideModal()
          setDeleteLoading(true)
          const res = await EmployeeRepository.delete(props.employee.id)
          setDeleteLoading(false)
          appContext.employeeDeleteState$.next(props.employee)
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
   appContext.showModal(ModalType.EmployeeForm, {employee: props.employee} as EmployeeFormModalArguments)
  }
  const receivingPointUser = (props.employee?.receivingPointUsers?.length ?? 0 ) === 1 ? props.employee!.receivingPointUsers[0] : null
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.topLeft}>
        <div className={classNames(styles.name, {[styles.large]: props.isLargeName})}>{UserUtils.getName(props.employee)}</div>
          {props.receivingPoint && receivingPointUser && <StatusBadge<ReceivingPointUserStatus> data={{
            [ReceivingPointUserStatus.Created]: {label: 'Приглашение отправлено', color: 'green'},
            [ReceivingPointUserStatus.Sent]: {label: 'Приглашение отправлено', color: 'green'},
            [ReceivingPointUserStatus.Confirmed]: {label: 'Зарегистрирован', color: 'blue'},
          }} value={receivingPointUser!.status}/>}
          {!props.receivingPoint && <StatusBadge<ReceivingPointUserStatus> data={{
            [ReceivingPointUserStatus.Created]: {label: 'Приглашение отправлено', color: 'green'},
            [ReceivingPointUserStatus.Sent]: {label: 'Приглашение отправлено', color: 'green'},
            [ReceivingPointUserStatus.Confirmed]: {label: 'Зарегистрирован', color: 'blue'},
          }} value={props.employee.isRegistered ? ReceivingPointUserStatus.Confirmed : ReceivingPointUserStatus.Sent}/>}
        </div>
        <div className={styles.email}>{props.employee.email}</div>
      </div>
      {/*<div className={styles.field}>
        <div className={styles.label}>Пункт приёма: </div><div className={styles.value}>г. Сергиев Посад, ул. Зои Космодемьянской, 32</div>
      </div>*/}
      <Field item={{label: 'Роль', value: UserUtils.getEmployeeRoleName(props.employee?.employeeRole ?? receivingPointUser?.initialRole!)}}/>
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
